using System;
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
         ICustomerService customerService)
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
        }
        #endregion

        #region Battles

        [Authorize]
        public ActionResult VideoBattleEditor(int VideoBattleId = 0)
        {
            var videoBattle = VideoBattleId != 0 ? _videoBattleService.GetById(VideoBattleId) : new VideoBattle();

            //can the user actually edit the battle?
            if (!CanEdit(videoBattle)) return InvokeHttp404();

            var model = new VideoBattleModel()
            {
                AcceptanceLastDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(10) : videoBattle.AcceptanceLastDate, //10 days
                ChallengerId = videoBattle.ChallengerId,
                DateCreated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateCreated,
                DateUpdated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateUpdated,
                VotingLastDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(20) : videoBattle.VotingLastDate, //20 days
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
                return Json(new {Success = false, Message = "Invalid"});

            //lets check if it's a new video battle or an edit is being performed
            VideoBattle videoBattle = null;
            if (Model.Id == 0)
            {
                videoBattle = new VideoBattle
                {
                    ChallengerId = _workContext.CurrentCustomer.Id,
                    DateCreated = DateTime.UtcNow
                };
            }
            else
            {
                videoBattle = _videoBattleService.GetById(Model.Id);
            }

            videoBattle.AcceptanceLastDate = Model.AcceptanceLastDate;            
            videoBattle.DateUpdated = DateTime.UtcNow;
            videoBattle.Description = Model.Description;
            videoBattle.VideoBattleStatus = VideoBattleStatus.Pending;
            videoBattle.VideoBattleType =  Model.VideoBattleType;
            videoBattle.VideoBattleVoteType = VideoBattleVoteType.SelectOneWinner; // Model.VideoBattleVoteType;
            videoBattle.Title = Model.Title;
            if (Model.Id == 0)
            {                
                _videoBattleService.Insert(videoBattle);
            }
            else
            {
                if (CanEdit(videoBattle))
                    _videoBattleService.Update(videoBattle);
            }
            return Json(new { Success = true, RedirectTo = Url.RouteUrl("VideoBattlePage", new { VideoBattleId = videoBattle.Id}) });
        }

        public ActionResult Index(int VideoBattleId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);

            //does the video battle exist?
            if (videoBattle == null)
                return InvokeHttp404();

            IList<VideoBattleParticipant> participants = null;

            //only open video battles can be viewed or ofcourse if I am the owner, I should be able to see it open or closed right?
            var canOpen = videoBattle.VideoBattleStatus == VideoBattleStatus.Open;
            //or is this the battle owner
            canOpen = canOpen || CanEdit(videoBattle);

            //still can't open, let's see if it's a participant accessting the page
            if (!canOpen)
            {
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);
                canOpen = participants.Count(x => x.ParticipantId == _workContext.CurrentCustomer.Id) > 0;
            }

            if (!canOpen) return InvokeHttp404();
            
            //get all the participants who have been invited, accepted etc. to the battle
            if(participants == null)
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);


            //lets get the videos associated with battle
            var battleVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);

            var challengerVideo = battleVideos.FirstOrDefault(x => x.ParticipantId == videoBattle.ChallengerId);
            var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);

            var challengerVideoModel = new VideoParticipantPublicModel()
            {
                ParticipantName = challenger.GetFullName(),
                Id = challenger.Id,
                CanEdit = _workContext.CurrentCustomer.Id == videoBattle.ChallengerId
                    
            };

            if (challengerVideo != null)
            {
                challengerVideoModel.VideoPath = challengerVideo.VideoPath;
                challengerVideoModel.MimeType = challengerVideo.MimeType;
            }

            var model = new VideoBattlePublicModel
            {
                Title = videoBattle.Title,
                Description = videoBattle.Description,
                AcceptanceLastDate = videoBattle.AcceptanceLastDate,
                VotingLastDate = videoBattle.VotingLastDate,
                DateCreated = videoBattle.DateCreated,
                DateUpdated = videoBattle.DateUpdated,
                Id = VideoBattleId
            };

            //add challenger as participant
            model.Participants.Add(challengerVideoModel);

            foreach (var participant in participants)
            {
                    
                var challengee = _customerService.GetCustomerById(participant.ParticipantId);
                var cModel = new VideoParticipantPublicModel()
                {
                    ParticipantName = challengee.GetFullName(),
                    Id = challengee.Id,
                    CanEdit = _workContext.CurrentCustomer.Id == participant.ParticipantId,
                    VideoBattleParticipantStatus = participant.ParticipantStatus
                };

                //find if the participant has uploaded video? only those who have accepted challege would be shown 'with videos'
                if (participant.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted)
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
               
                
            model.IsEditable = CanEdit(videoBattle);
            return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/Single.cshtml", model);
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
                        var videoBattleParticipant = new VideoBattleParticipant()
                        {
                            ParticipantId = pi,
                            ParticipantStatus = VideoBattleParticipantStatus.Challenged,
                            VideoBattleId = VideoBattleId
                        };
                        _videoBattleParticipantService.Insert(videoBattleParticipant);
                        model.Add(new { 
                            Success = true,
                            ParticipantId = pi
                        });
                    }
                    else
                    {
                        model.Add(new
                        {
                            Success = false,
                            ParticipantId = pi,
                            Status = status
                        });
                    }
                }
                
                return Json(model); ;
            }
            return Json(new { Success = false, Message = "Unauthorized"}); ;
                
        }

        [Authorize]
        [HttpPost]
        public ActionResult UpdateParticipantStatus(int VideoBattleId, VideoBattleParticipantStatus VideoBattleParticipantStatus)
        {
            var ParticipantId = _workContext.CurrentCustomer.Id;
            var videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId, ParticipantId);
            if(videoBattleParticipant == null)
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
                _videoBattleParticipantService.Update(videoBattleParticipant);
                return Json(new {Success = true, ParticipantStatus = videoBattleParticipant.ParticipantStatus, ParticipantId = ParticipantId});
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

            bool eligibleToUpload = false;
            //is the participant actually eligible to upload?
            if (videoBattle.ChallengerId == _workContext.CurrentCustomer.Id)
            {
                //the challenger is uploading
                eligibleToUpload = true;
            }
            else
            {
                var videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId,
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
                        videoBattleVideo = new VideoBattleVideo()
                        {
                            ParticipantId = ParticipantId,
                            MimeType = contentType,
                            VideoBattleId = VideoBattleId,
                            VideoPath = savePath,
                            //TODO: Set video status to pending so that admin can approve 
                            VideoStatus = VideoStatus.Approved,
                            DateUploaded = DateTime.UtcNow
                        };
                        _videoBattleVideoService.Insert(videoBattleVideo);

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
                            videoBattle.VideoBattleStatus = VideoBattleStatus.Open;
                            _videoBattleService.Update(videoBattle);
                        }

                    }
                    else
                    {
                        //so the user has already uploaded the video
                        //we can let the user change a video only if he is a challenger and no other participants are there
                        var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, VideoBattleParticipantStatus.Challenged);
                        if (participants.Count == 0)
                        {
                            //TODO: Delete existing video, should we?
                            videoBattleVideo.VideoPath = savePath;
                            //TODO: Set video status to pending so that admin can approve 
                            videoBattleVideo.VideoStatus = VideoStatus.Approved;
                            _videoBattleService.Update(videoBattle);
                        }
                    }
                    return Json(new { Success = true, VideoUrl = ""});

                }
                else
                {
                    return Json(new { Success = false, Message = "Unauthorized" });
                }
            }
            else
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }

         
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
            //first find the video battle
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            //is the video available for voting
            if (videoBattle.VideoBattleStatus == VideoBattleStatus.Open)
            {
                var customer = _workContext.CurrentCustomer;
                //check if the logged in user has voted for this battle
                var videoBattleVotes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, customer.Id);

                var voteCount = videoBattleVotes.Count(x => x.UserId == customer.Id && x.ParticipantId == ParticipantId);

                if(voteCount == 1)
                {
                    //already voted for this participant, not it can't be changed
                    return Json(new { Success = false, Message = "Already Voted" });
                }
                else
                {
                    //user has not voted for this participant however it may be possible that depending on vote type, user can't vote on this battle
                    switch (videoBattle.VideoBattleVoteType)
                    {
                        case VideoBattleVoteType.SelectOneWinner:
                            //if one winner was to be selected, we'll have to check if user has not voted for some other participant
                            if (videoBattleVotes.Count > 0)
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
                    var videoBattleVote = new VideoBattleVote()
                    {
                        ParticipantId = ParticipantId,
                        UserId = customer.Id,
                        VideoBattleId = videoBattle.Id,
                        VoteValue = VoteValue
                    };
                    _videoBattleVoteService.Insert(videoBattleVote);
                    return Json(new { Success = true });

                }
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
            return _workContext.CurrentCustomer.Id == VideoBattle.ChallengerId //page owner
                || _workContext.CurrentCustomer.IsAdmin(); //administrator
                
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

        #endregion
    }
}
