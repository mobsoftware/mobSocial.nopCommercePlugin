using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Enums;
using System.Web;
using Mob.Core;
using Nop.Services.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class VideoBattleController : BasePublicController
    {
        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IVideoBattleService _videoBattleService;
        private readonly IVideoBattleParticipantService _videoBattleParticipantService;
        private readonly IVideoBattleGenreService _videoBattleGenreService;
        private readonly IVideoBattleVideoService _videoBattleVideoService;
        private readonly IVideoBattleVoteService _videoBattleVoteService;
        private readonly IVideoGenreService _videoGenreService;
        private readonly ICustomerService _customerService;
        private readonly IMobSocialMessageService _mobsocialMessageService;

        #region ctor

        public VideoBattleController(
         IWorkContext workContext,
         IStoreContext storeContext,
         IVideoBattleService videoBattleService,
         IVideoBattleParticipantService videoBattleParticipantService,
         IVideoBattleGenreService videoBattleGenreService,
         IVideoBattleVideoService videoBattleVideoService,
         IVideoBattleVoteService videoBattleVoteService,
         IVideoGenreService videoGenreService,
         ICustomerService customerService,
            IMobSocialMessageService mobsocialMessageService)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _videoBattleService = videoBattleService;
            _videoBattleParticipantService = videoBattleParticipantService;
            _videoBattleGenreService = videoBattleGenreService;
            _videoBattleVideoService = videoBattleVideoService;
            _videoBattleVoteService = videoBattleVoteService;
            _videoGenreService = videoGenreService;
            _customerService = customerService;
            _mobsocialMessageService = mobsocialMessageService;
        }
        #endregion

        #region Battles

        [Authorize]
        public ActionResult VideoBattleEditor(int VideoBattleId = 0)
        {
            var videoBattle = VideoBattleId != 0 ? _videoBattleService.GetById(VideoBattleId) : new VideoBattle();

            //can the user actually edit the battle?
            if (!CanEdit(videoBattle))
                return InvokeHttp404();

            var model = new VideoBattleModel() {
                AcceptanceLastDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(10) : videoBattle.AcceptanceLastDate.ToLocalTime(), //10 days
                ChallengerId = videoBattle.ChallengerId,
                DateCreated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateCreated,
                DateUpdated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateUpdated,
                VotingLastDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(20) : videoBattle.VotingLastDate.ToLocalTime(), //20 days
                Description = videoBattle.Description,
                Title = videoBattle.Title,
                Id = videoBattle.Id,
                VideoBattleStatus = videoBattle.VideoBattleStatus,
                VideoBattleType = videoBattle.VideoBattleType,
                VideoBattleVoteType = videoBattle.VideoBattleVoteType
            };
            return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/VideoBattleEditor.cshtml", model);
        }

        [HttpPost]
        public ActionResult SaveVideoBattle(VideoBattleModel Model)
        {
            if (!ModelState.IsValid)
                return Json(new { Success = false, Message = "Invalid" });

            //lets check if it's a new video battle or an edit is being performed
            VideoBattle videoBattle = null;
            if (Model.Id == 0)
            {
                videoBattle = new VideoBattle {
                    ChallengerId = _workContext.CurrentCustomer.Id,
                    DateCreated = DateTime.UtcNow
                };
            }
            else
            {
                videoBattle = _videoBattleService.GetById(Model.Id);
            }

            
            videoBattle.DateUpdated = DateTime.UtcNow;
            videoBattle.Description = Model.Description;
            videoBattle.VideoBattleStatus = VideoBattleStatus.Pending;
            videoBattle.VideoBattleType = Model.VideoBattleType;
            videoBattle.VideoBattleVoteType = VideoBattleVoteType.SelectOneWinner; // Model.VideoBattleVoteType;
            videoBattle.Title = Model.Title;
            if (Model.Id == 0)
            {
                videoBattle.AcceptanceLastDate = Model.AcceptanceLastDate.ToUniversalTime();
                videoBattle.VotingLastDate = Model.VotingLastDate.ToUniversalTime();
                _videoBattleService.Insert(videoBattle);
            }
            else
            {
                //its an update...if there is any participant who has accepted the challenge then acceptance date and voting date can only be extended and not shrinked
                if (Model.AcceptanceLastDate.ToUniversalTime() < videoBattle.AcceptanceLastDate || Model.VotingLastDate.ToUniversalTime() < videoBattle.VotingLastDate)
                {
                    //so this is the case. lets see if we have any participants who have accepted the challenge
                    var participants = _videoBattleParticipantService.GetVideoBattleParticipants(Model.Id,
                        VideoBattleParticipantStatus.ChallengeAccepted);
                    if (participants.Count > 0)
                    {
                        //nop, somebody has accepted the challenge. date can only be exended
                        return Json(new { Success = false, Message="Acceptance and Voting dates can only be extended now, because a challengee has accepted the challenge" });
                    }
                }
                videoBattle.AcceptanceLastDate = Model.AcceptanceLastDate.ToUniversalTime();
                videoBattle.VotingLastDate = Model.VotingLastDate.ToUniversalTime();
                if (CanEdit(videoBattle))
                    _videoBattleService.Update(videoBattle);
                else
                {
                    return Json(new {Success = false, Message="Unauthorized"});
                }
            }
            return Json(new { Success = true, RedirectTo = Url.RouteUrl("VideoBattlePage", new { VideoBattleId = videoBattle.Id }) });
        }

        public ActionResult Index(int VideoBattleId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);

            //does the video battle exist?
            if (videoBattle == null)
                return InvokeHttp404();

            IList<VideoBattleParticipant> participants = null;

            //it's quite possible that battle is about to open and we are waiting for scheduler to open the battle...we should lock it then
            //so that nobody can do anything with it now.
            if ((videoBattle.AcceptanceLastDate <= DateTime.UtcNow && videoBattle.VideoBattleStatus == VideoBattleStatus.Pending) ||
                (videoBattle.VotingLastDate <= DateTime.UtcNow && videoBattle.VideoBattleStatus == VideoBattleStatus.Open))
            {
                videoBattle.VideoBattleStatus = VideoBattleStatus.Locked;
                _videoBattleService.Update(videoBattle);
            }

            //only open video battles can be viewed or ofcourse if I am the owner, I should be able to see it open or closed right?
            var canOpen = videoBattle.VideoBattleStatus != VideoBattleStatus.Pending || CanEdit(videoBattle);

            //still can't open, let's see if it's a participant accessting the page
            if (!canOpen)
            {
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);
                canOpen = participants.Count(x => x.ParticipantId == _workContext.CurrentCustomer.Id) > 0;
                
            }
            if(!canOpen)
                return InvokeHttp404();

            //get all the participants who have been invited, accepted etc. to the battle
            if(participants == null)
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);


            //lets get the videos associated with battle
            var battleVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);

            var challengerVideo = battleVideos.FirstOrDefault(x => x.ParticipantId == videoBattle.ChallengerId);
            var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);

            var challengerVideoModel = new VideoParticipantPublicModel() {
                ParticipantName = challenger.GetFullName(),
                Id = challenger.Id,
                CanEdit = _workContext.CurrentCustomer.Id == videoBattle.ChallengerId,
                ParticipantUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = _workContext.CurrentCustomer.GetSeName(0) })
                
            };

            if (challengerVideo != null && (videoBattle.VideoBattleStatus != VideoBattleStatus.Pending || challenger.Id == _workContext.CurrentCustomer.Id))
            {
                challengerVideoModel.VideoPath = challengerVideo.VideoPath;
                challengerVideoModel.MimeType = challengerVideo.MimeType;
            }

            var model = new VideoBattlePublicModel {
                Title = videoBattle.Title,
                Description = videoBattle.Description,
                AcceptanceLastDate = videoBattle.AcceptanceLastDate,
                VotingLastDate = videoBattle.VotingLastDate,
                DateCreated = videoBattle.DateCreated,
                DateUpdated = videoBattle.DateUpdated,
                VideoBattleStatus = videoBattle.VideoBattleStatus,
                VideoBattleType = videoBattle.VideoBattleType,
                VideoBattleVoteType = videoBattle.VideoBattleVoteType,
                Id = VideoBattleId,
                RemainingSeconds = GetRemainingSeconds(videoBattle)
            };

            //add challenger as participant
            model.Participants.Add(challengerVideoModel);

            //and now challengees
            foreach (var participant in participants)
            {

                var challengee = _customerService.GetCustomerById(participant.ParticipantId);
                var cModel = new VideoParticipantPublicModel() {
                    ParticipantName = challengee.GetFullName(),
                    ParticipantUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = challengee.GetSeName(0) }),
                    Id = challengee.Id,
                    CanEdit = _workContext.CurrentCustomer.Id == participant.ParticipantId,
                    VideoBattleParticipantStatus = participant.ParticipantStatus
                };

                //find if the participant has uploaded video? only those who have accepted challege would be shown 'with videos'
                if (participant.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted && (videoBattle.VideoBattleStatus != VideoBattleStatus.Pending || participant.ParticipantId == _workContext.CurrentCustomer.Id))
                {
                    var video = battleVideos.FirstOrDefault(x => x.ParticipantId == participant.ParticipantId);
                    if (video != null)
                    {
                        cModel.VideoPath = video.VideoPath;
                        cModel.MimeType = video.MimeType;
                    }
                }
                model.Participants.Add(cModel);
            }

            //let's find if the logged in user has voted for this battle. 
            //also we gather various voting stats till now for battle videos
            //voting info for logged in user
            var videoBattleVotes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, null);
            var videoBattleCurrentUserVotes = videoBattleVotes.Where(x => x.UserId == _workContext.CurrentCustomer.Id);

            foreach (var participant in model.Participants)
            {
                //first the global voting status for this participant
                var votesForParticipant = videoBattleVotes.Where(x => x.ParticipantId == participant.Id && x.VoteStatus == VideoBattleVoteStatus.Voted);

                //total votes
                var forParticipant = votesForParticipant as IList<VideoBattleVote> ?? votesForParticipant.ToList();
                if (forParticipant.Count > 0)
                {
                    participant.TotalVoters = forParticipant.Count();

                    //we store 1 for like 0 for dislike
                    participant.RatingCountLike =
                        forParticipant.Count(x => x.VoteValue == 1);

                    participant.RatingCountDislike =
                        forParticipant.Count(x => x.VoteValue == 0);


                    //average rating is the average of all the vote values 
                    participant.AverageRating = forParticipant.Average(x => (decimal)x.VoteValue);
                }
               


                //now vote of logged in user
                var currentUserVote = videoBattleCurrentUserVotes.FirstOrDefault(x => x.ParticipantId == participant.Id && x.VoteStatus == VideoBattleVoteStatus.Voted);
                if (currentUserVote != null)
                {
                    //stores the value of vote for logged in user if any
                    participant.CurrentUserVote = new VideoBattleVotePublicModel {
                        VoteValue = currentUserVote.VoteValue
                    };
                }
                else
                {
                    participant.CurrentUserVote = null;
                }
            }

            //and who is the winner or leader?
            VideoParticipantPublicModel winnerOrLeader = null;
            switch (videoBattle.VideoBattleVoteType)
            {
                case VideoBattleVoteType.SelectOneWinner:
                    //one with max vote count is winner/leader
                    winnerOrLeader = model.Participants.OrderByDescending(x => x.TotalVoters).First();
                   
                    break;
                case VideoBattleVoteType.LikeDislike:
                    //one with more likes is winner/leader
                    winnerOrLeader = model.Participants.OrderByDescending(x => x.RatingCountLike).First();
                    break;
                case VideoBattleVoteType.Rating:
                    //one with max average rating is winner/leader
                    winnerOrLeader = model.Participants.OrderByDescending(x => x.AverageRating).First();
                    break;
            }
            if (winnerOrLeader != null)
            {
                winnerOrLeader.IsLeading = true;
                if (videoBattle.VideoBattleStatus == VideoBattleStatus.Complete)
                {
                    winnerOrLeader.IsWinner = true;
                }
            }
            //because we use same interface to inviting participants and voters, its necessary that we show the invite box to participants (who have accepted) as well
            //ofcourse with Invite Voters title
            model.IsParticipant = model.Participants.Where(x => x.VideoBattleParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted).Select(x => x.Id).Contains(_workContext.CurrentCustomer.Id);
            model.IsEditable = CanEdit(videoBattle);
            return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/Single.cshtml", model);
        }

        public ActionResult VideoBattles()
        {
            return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/VideoBattles.cshtml");
        }

        /// <summary>
        /// Loads battles using ajax
        /// </summary>
        public ActionResult GetBattles(string ViewType, int Page = 1, int Count = 15)
        {
            //let's get all the battles depending on view type
            ViewType = ViewType.ToLowerInvariant();
            IList<VideoBattle> battles = null;
            int totalPages = 0;
            switch (ViewType)
            {
                case "open":
                    battles = _videoBattleService.GetAll(null, null, null, VideoBattleStatus.Open, out totalPages, Page, Count);
                    battles = battles.ToList();
                    break;
                case "challenged":
                    battles = _videoBattleService.GetAll(null, _workContext.CurrentCustomer.Id, null, VideoBattleStatus.Pending, out totalPages, Page, Count);
                    battles = battles.ToList();
                    break;
                case "closed":
                    //either closed or complete..whichever it is so first get all of them
                    battles = _videoBattleService.GetAll(null, null, null, null, out totalPages, 1, int.MaxValue);

                    battles =
                        battles.Where(
                            x =>
                                x.VideoBattleStatus == VideoBattleStatus.Closed ||
                                x.VideoBattleStatus == VideoBattleStatus.Complete)
                            .ToList();
                    totalPages = int.Parse(Math.Ceiling((decimal)battles.Count() / Count).ToString());
                    
                    battles = battles.Skip((Page - 1)*Count)
                        .Take(Count).ToList();

                    break;
                case "my":
                    battles = _videoBattleService.GetAll(_workContext.CurrentCustomer.Id, null, null, null,out totalPages, Page, Count);
                    battles = battles.ToList();
                    break;
            }

            var model = new List<VideoBattlePublicModel>();
            if (battles != null)
            {
                foreach (var videoBattle in battles)
                {
                    //get the owner of battle 
                    var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);

                    model.Add(new VideoBattlePublicModel()
                    {
                        Title = videoBattle.Title,
                        Description = videoBattle.Description,
                        AcceptanceLastDate = videoBattle.AcceptanceLastDate,
                        VotingLastDate = videoBattle.VotingLastDate,
                        DateCreated = videoBattle.DateCreated,
                        DateUpdated = videoBattle.DateUpdated,
                        VideoBattleStatus = videoBattle.VideoBattleStatus,
                        VideoBattleType = videoBattle.VideoBattleType,
                        VideoBattleVoteType = videoBattle.VideoBattleVoteType,
                        Id = videoBattle.Id,
                        IsEditable = CanEdit(videoBattle),
                        ChallengerName = challenger.GetFullName(),
                        ChallengerUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = challenger.GetSeName(0) }),
                        VideoBattleUrl = Url.RouteUrl("VideoBattlePage", new { VideoBattleId = videoBattle.Id }),
                        RemainingSeconds = GetRemainingSeconds(videoBattle)
                    });
                }
            }
            return Json(new
            {
                Success =true,
                VideoBattles = model,
                TotalPages = totalPages
            });
        }
        #endregion

        #region Participants

        [HttpPost]
        [Authorize]
        public ActionResult InviteParticipants(int VideoBattleId, IList<int> ParticipantIds)
        {
            //first check if it's a valid videobattle and the logged in user can actually invite
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            var model = new List<object>();
            if (CanInvite(videoBattle))
            {
                foreach (var pi in ParticipantIds)
                {
                    var status = _videoBattleParticipantService.GetParticipationStatus(VideoBattleId, pi);
                    //only people who have not been challenged
                    if (status == VideoBattleParticipantStatus.NotChallenged)
                    {
                        var videoBattleParticipant = new VideoBattleParticipant() {
                            ParticipantId = pi,
                            ParticipantStatus = VideoBattleParticipantStatus.Challenged,
                            VideoBattleId = VideoBattleId,
                            LastUpdated = DateTime.UtcNow
                        };
                        _videoBattleParticipantService.Insert(videoBattleParticipant);
                        model.Add(new {
                            Success = true,
                            ParticipantId = pi
                        });

                        //send email notification to the participant
                        var challengee = _customerService.GetCustomerById(pi);
                        _mobsocialMessageService.SendSomeoneChallengedYouForABattleNotification(
                            _workContext.CurrentCustomer, challengee, videoBattle, _workContext.WorkingLanguage.Id,
                            _storeContext.CurrentStore.Id);
                    }
                    else
                    {
                        model.Add(new {
                            Success = false,
                            ParticipantId = pi,
                            Status = status
                        });
                    }
                }

                return Json(model);
                ;
            }
            return Json(new { Success = false, Message = "Unauthorized" });
            ;

        }

        [HttpPost]
        [Authorize]
        public ActionResult InviteVoters(int VideoBattleId, IList<int> VoterIds)
        {
            //first check if it's a valid videobattle and the logged in user can actually invite
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (videoBattle == null)
                return Json(new { Success = false, Message = "Invalid battle"});

            var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId,
                VideoBattleParticipantStatus.ChallengeAccepted);

            var model = new List<object>();
            if (CanInvite(videoBattle) || participants.Select(x => x.ParticipantId).Contains(_workContext.CurrentCustomer.Id))
            {
                var votes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, null);

                foreach (var vi in VoterIds)
                {
                    var vote = votes.FirstOrDefault(x => x.UserId == vi);
                    if (vote == null)
                    {
                        vote = new VideoBattleVote()
                        {
                            VideoBattleId = VideoBattleId,
                            ParticipantId = _workContext.CurrentCustomer.Id,
                            VoteStatus = VideoBattleVoteStatus.NotVoted,
                            VoteValue = 0,
                            UserId = vi
                        };
                        _videoBattleVoteService.Insert(vote);

                        //send the notification
                        var receiver = _customerService.GetCustomerById(vi);
                        _mobsocialMessageService.SendVotingReminderNotification(_workContext.CurrentCustomer, receiver,
                            videoBattle, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                         model.Add(new {
                            Success = true,
                            VoterId = vi,
                        });
                    }
                    else
                    {
                        model.Add(new {
                            Success = false,
                            VoterId = vi,
                            Message = "Already invited"
                        });
                    }
                }

                return Json(model);
                
            }
            return Json(new { Success = false, Message = "Unauthorized" });
        }
        [Authorize]
        [HttpPost]
        public ActionResult UpdateParticipantStatus(int VideoBattleId, VideoBattleParticipantStatus VideoBattleParticipantStatus)
        {
            var ParticipantId = _workContext.CurrentCustomer.Id;
            var videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId, ParticipantId);
            if (videoBattleParticipant == null)
            {
                //uh oh something is wrong here. why is there no video battle participant. was he not invited?
                return Json(new { Success = false, Message = "Unauthorized" });
            }
            //lets first check the battle for validations
            var videoBattle = _videoBattleService.GetById(videoBattleParticipant.VideoBattleId);
            if (videoBattle == null
                || videoBattle.VideoBattleStatus != VideoBattleStatus.Pending
                || videoBattle.AcceptanceLastDate < DateTime.UtcNow)
            {
                return Json(new { Success = false, Message = "Battle Closed Or Expired" });
            }


            //so it's there.
            if (videoBattleParticipant.ParticipantStatus == VideoBattleParticipantStatus.Challenged)
            {
                switch (VideoBattleParticipantStatus)
                {
                    case VideoBattleParticipantStatus.ChallengeAccepted:
                    case VideoBattleParticipantStatus.ChallengeDenied:
                        //only the one who is participant should be able to accept/deny the challenge
                        if (_workContext.CurrentCustomer.Id == ParticipantId)
                        {
                            videoBattleParticipant.ParticipantStatus = VideoBattleParticipantStatus;
                        }
                        break;
                    case VideoBattleParticipantStatus.ChallengeCancelled:
                        //only the one who challenges or admin can cancel the challenge
                        if (_workContext.CurrentCustomer.IsAdmin() || _workContext.CurrentCustomer.Id == videoBattle.ChallengerId)
                        {
                            videoBattleParticipant.ParticipantStatus = VideoBattleParticipantStatus;
                        }
                        break;
                }
                videoBattleParticipant.LastUpdated = DateTime.UtcNow;
                _videoBattleParticipantService.Update(videoBattleParticipant);
                return Json(new { Success = true, ParticipantStatus = videoBattleParticipant.ParticipantStatus, ParticipantId = ParticipantId });
            }
            else
            {
                return Json(new { Success = false });
            }


        }
        #endregion

        #region Videos
        /// <summary>
        /// The method used for uploading videos for challenger and challangee
        /// </summary>
        /// <param name="VideoBattleId">The ID of video battle</param>
        /// <param name="ParticipantId">The ID of Challenger or Challengee</param>
        /// <param name="File">The Video File</param>
        /// <returns>JSon response with success as true or false</returns>
        [HttpPost]
        public ActionResult UploadVideo(int VideoBattleId, int ParticipantId, HttpPostedFileBase File)
        {
            //is there any file to upload
            if (File == null)
            {
                return Json(new { Success = false, Message = "Missing File" });
            }

            //first lets find out if it's legal to upload video now?
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            VideoBattleParticipant videoBattleParticipant = null;

            bool eligibleToUpload = false;
            //is the participant actually eligible to upload?
            if (videoBattle.ChallengerId == _workContext.CurrentCustomer.Id)
            {
                //the challenger is uploading
                eligibleToUpload = true;
            }
            else
            {
                videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId,
             ParticipantId);
                if (videoBattleParticipant != null)
                {
                    //so the participant is actually there. good then
                    eligibleToUpload = true;

                }
            }


            if (eligibleToUpload)
            {
                //now that the participant is eligible, let's check if he has already uploaded one.
                //only if, a challenger, has not published the battle can he upload the video. Published battles' videos can't be changed
                if (videoBattle.VideoBattleStatus == VideoBattleStatus.Pending)
                {
                    //let's save the file to the server first
                    var contentType = File.ContentType;

                    var fileName = Path.GetFileName(File.FileName);
                    var fileExtension = Path.GetExtension(fileName);
                    if (!string.IsNullOrEmpty(fileExtension))
                        fileExtension = fileExtension.ToLowerInvariant();

                    if (string.IsNullOrEmpty(contentType))
                    {
                        contentType = VideoUtility.GetContentType(fileExtension);
                    }


                    var savePath = ControllerUtil.MobSocialPluginsFolder + "Uploads/" + DateTime.Now.Ticks.ToString() + fileExtension;
                    //save the file
                    File.SaveAs(Server.MapPath(savePath));

                    var videoBattleVideo = _videoBattleVideoService.GetBattleVideo(VideoBattleId, ParticipantId);
                    if (videoBattleVideo == null)
                    {
                        //so this is the new video by participant
                        videoBattleVideo = new VideoBattleVideo() {
                            ParticipantId = ParticipantId,
                            MimeType = contentType,
                            VideoBattleId = VideoBattleId,
                            VideoPath = savePath,
                            //TODO: Set video status to pending so that admin can approve 
                            VideoStatus = VideoStatus.Approved,
                            DateUploaded = DateTime.UtcNow
                        };
                        _videoBattleVideoService.Insert(videoBattleVideo);

                        //UNCOMMENT THE LINES BELOW IF YOU WISH TO OPEN THE BATTLES AS SOON AS VIDEOS ARE UPLOADED. NOT IT USES APPROPRIATE CHECKS BEFORE MARKING THE BATTLE LOCKED

                        /*
                        //let's get all the videos already uploaded, we mark the video battle open immediately if all the participants have uploaded videos or time limit has reached
                        var allVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);
                        var allParticipants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null).AsQueryable();

                        var totalChallenged = allParticipants.Count();
                        var totalAccepted =
                            allParticipants.Count(
                                x => x.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted);

                        var totalPending =
                            allParticipants.Count(x => x.ParticipantStatus == VideoBattleParticipantStatus.Challenged);

                        var markOpen = false;

                        markOpen = totalChallenged == allVideos.Count || //all challenged have uploaded their videos
                                   (totalPending == 0); //people have already either rejected or cancelled from the battle

                        if (markOpen)
                        {

                            //let the battle begin...TINGGG!!!
                            videoBattle.VideoBattleStatus = VideoBattleStatus.Locked;
                            _videoBattleService.Update(videoBattle);
                        }*/

                    }
                    else
                    {
                        //so the user has already uploaded the video
                        //TODO: Delete existing video, should we?
                        videoBattleVideo.VideoPath = savePath;
                        //TODO: Set video status to pending so that admin can approve 
                        videoBattleVideo.VideoStatus = VideoStatus.Approved;
                        _videoBattleService.Update(videoBattle);
                    }

                    //let's update participant's last updated date if it's there
                    if (videoBattleParticipant != null)
                    {
                        videoBattleParticipant.LastUpdated = DateTime.UtcNow;
                        _videoBattleParticipantService.Update(videoBattleParticipant);
                    }
                    return Json(new {
                        Success = true,
                        VideoPath = savePath,
                        MimeType = videoBattleVideo.MimeType,
                        ParticipantId = videoBattleParticipant != null ? videoBattleParticipant.ParticipantId : _workContext.CurrentCustomer.Id
                    });

                }
            }

            return Json(new { Success = false, Message = "Unauthorized" });
        }
        #endregion

        #region Battle Genres
        #endregion

        #region Video Genres
        #endregion

        #region Video Battles Votes

        [Authorize]
        [HttpPost]
        public ActionResult VoteBattle(int VideoBattleId, int ParticipantId, int VoteValue)
        {
            var customer = _workContext.CurrentCustomer;
            //should not vote himself or herself
            if (customer.Id == ParticipantId)
            {
                return Json(new { Success = false, Message = "You can't vote yourself" });
            }


            //first find the video battle
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            //is the video available for voting
            if (videoBattle.VideoBattleStatus == VideoBattleStatus.Open)
            {

                //check if the logged in user has voted for this battle
                var videoBattleVotes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, customer.Id);

                var vote = videoBattleVotes.FirstOrDefault(x => x.UserId == customer.Id && x.ParticipantId == ParticipantId);

                if (vote != null)
                {
                    //so there is a vote. is the voting status notvoted then only he'll be able to vote
                    if (vote.VoteStatus == VideoBattleVoteStatus.Voted)
                        //already voted for this participant, not it can't be changed
                        return Json(new {Success = false, Message = "Already Voted"});
                    
                    //yep...this vote might be from somebody who has been invited and not voted yet. let's do it.
                    vote.VoteValue = VoteValue;
                    vote.VoteStatus = VideoBattleVoteStatus.Voted;
                    _videoBattleVoteService.Update(vote);
                }
                else
                {
                    //user has not voted for this participant however it may be possible that depending on vote type, user can't vote on this battle
                    switch (videoBattle.VideoBattleVoteType)
                    {
                        case VideoBattleVoteType.SelectOneWinner:
                            //if one winner was to be selected, we'll have to check if user has not voted for some other participant
                            if (videoBattleVotes.Count(x => x.VoteStatus == VideoBattleVoteStatus.Voted) > 0)
                            {
                                //yes, user has voted for some other participant so he can't vote for this participant now.
                                return Json(new { Success = false, Message = "Already Voted" });
                            }
                            break;
                        case VideoBattleVoteType.Rating:
                            break;
                        case VideoBattleVoteType.LikeDislike:
                            break;
                    }
                    //user can vote now. let's create a new vote
                    var videoBattleVote = new VideoBattleVote() {
                        ParticipantId = ParticipantId,
                        UserId = customer.Id,
                        VideoBattleId = videoBattle.Id,
                        VoteValue = VoteValue,
                        VoteStatus = VideoBattleVoteStatus.Voted
                    };
                    _videoBattleVoteService.Insert(videoBattleVote);
                   

                }
                return Json(new { Success = true });
            }
            else
            {
                return Json(new { Success = false, Message = "Closed For Voting" });
            }

        }
        #endregion

        #region Utilities
        /// <summary>
        /// Checks if current logged in user can actually edit the battle
        /// </summary>
        /// <returns>True if editing is allowed. False otherwise</returns>
        [NonAction]
        bool CanEdit(VideoBattle VideoBattle)
        {
            if (VideoBattle == null)
                return false;
            return (_workContext.CurrentCustomer.Id == VideoBattle.ChallengerId //page owner
                || VideoBattle.Id == 0 //new battle
                || _workContext.CurrentCustomer.IsAdmin()); //administrator

        }

        /// <summary>
        /// Checks if current logged in user can actually delete the battle
        /// </summary>
        /// <returns>True if deletion is allowed. False otherwise</returns>
        [NonAction]
        bool CanDelete(VideoBattle VideoBattle)
        {
            if (VideoBattle == null)
                return false;
            return _workContext.CurrentCustomer.Id == VideoBattle.ChallengerId //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
        }

        /// <summary>
        /// Checks if current logged in user can actually invite a participant
        /// </summary>
        /// <returns>True if invite is allowed. False otherwise</returns>
        [NonAction]
        bool CanInvite(VideoBattle VideoBattle)
        {
            if (VideoBattle == null)
                return false;
            return _workContext.CurrentCustomer.Id == VideoBattle.ChallengerId && VideoBattle.VideoBattleStatus == VideoBattleStatus.Open //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
        }

        /// <summary>
        /// Returns remaining seconds of a battle for opening the battle (if it's pending) or completing the battle (if it's locked)
        /// </summary>
        /// <returns></returns>
        int GetRemainingSeconds(VideoBattle VideoBattle)
        {
            var now = DateTime.UtcNow;
            var endDate = DateTime.UtcNow;

            if (VideoBattle.VideoBattleStatus == VideoBattleStatus.Pending && VideoBattle.AcceptanceLastDate > now)
            {
                endDate = VideoBattle.AcceptanceLastDate;
            }
            else if (VideoBattle.VideoBattleStatus == VideoBattleStatus.Open)
            {
                endDate = VideoBattle.VotingLastDate;
            }
            var diffDate = endDate.Subtract(now);
            var maxSeconds = Convert.ToInt32(diffDate.TotalSeconds);
            return maxSeconds;
        }
        #endregion
    }
}
