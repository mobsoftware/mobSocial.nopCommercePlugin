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
            VideoBattle videoBattle;
            if (VideoBattleId != 0)
                videoBattle = _videoBattleService.GetById(VideoBattleId);
            else
                videoBattle = new VideoBattle();

            //can the user actually edit the battle?
            if (CanEdit(videoBattle))
            {
                var model = new VideoBattleModel()
                {
                    AcceptanceLastDate = videoBattle.AcceptanceLastDate,
                    ChallengerId = videoBattle.ChallengerId,
                    DateCreated = videoBattle.DateCreated,
                    DateUpdated = videoBattle.DateUpdated,
                    Description = videoBattle.Description,
                    Title = videoBattle.Title,
                    Id = videoBattle.Id,
                    VideoBattleStatus = videoBattle.VideoBattleStatus,
                    VideoBattleType = videoBattle.VideoBattleType,
                    VideoBattleVoteType = videoBattle.VideoBattleVoteType
                };
                return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/VideoBattleEditor.cshtml", model);
            }
            return new HttpUnauthorizedResult();

        }

        [Authorize]
        public ActionResult SaveVideoBattle(VideoBattleModel Model)
        {
            if (!ModelState.IsValid)
                return new HttpUnauthorizedResult();

            //lets check if it's a new video battle or an edit is being performed
            VideoBattle videoBattle = null;
            if (Model.Id == 0)
            {
                videoBattle = new VideoBattle();
                videoBattle.ChallengerId = _workContext.CurrentCustomer.Id;
                videoBattle.DateCreated = DateTime.UtcNow;
            }
            else
            {
                videoBattle = _videoBattleService.GetById(Model.Id);
            }

            videoBattle.AcceptanceLastDate = Model.AcceptanceLastDate;            
            videoBattle.DateUpdated = DateTime.UtcNow;
            videoBattle.Description = Model.Description;
            videoBattle.VideoBattleStatus = VideoBattleStatus.Pending;
            videoBattle.VideoBattleType = Model.VideoBattleType;
            videoBattle.VideoBattleVoteType = Model.VideoBattleVoteType;
            
            if (Model.Id == 0)
            {                
                _videoBattleService.Insert(videoBattle);
            }
            else
            {
                if (CanEdit(videoBattle))
                    _videoBattleService.Update(videoBattle);
            }
            return Json(new { Success = true });
        }

        public ActionResult ViewVideoBattle(int VideoBattleId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            //only open video battles can be viewed or ofcourse if I am the owner, I should be able to see it open or closed right?
            if (videoBattle.VideoBattleStatus == VideoBattleStatus.Open || CanEdit(videoBattle))
            {
                //lets get the videos associated with battle
                var battleVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);

                var challengerVideo = battleVideos.First(x => x.ParticipantId == videoBattle.ChallengerId);
                var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);

                var challengerVideoModel = new VideoParticipantPublicModel()
                {
                    VideoPath = challengerVideo.VideoPath,
                    ParticipantName = challenger.GetFullName(),
                    MimeType = challengerVideo.MimeType
                };
                var model = new VideoBattlePublicModel
                {
                    Challenger = challengerVideoModel
                };

                //lets now add the challengee videos
                foreach (var video in battleVideos.Where(x => x.ParticipantId != _workContext.CurrentCustomer.Id))
                {
                    var challengee = _customerService.GetCustomerById(video.ParticipantId);
                    model.Challengee.Add(new VideoParticipantPublicModel()
                    {
                        VideoPath = video.VideoPath,
                        ParticipantName = challengee.GetFullName(),
                        MimeType = video.MimeType
                    });
                }

                model.IsEditable = CanEdit(videoBattle);
                return View(ControllerUtil.MobSocialViewsFolder + "/VideoBattle/ViewVideoBattle.cshtml", model);
            }
            return InvokeHttp404();
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
                            ParticipantStatus = VideoBattleParticipantStatus.Challanged,
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
                
                return Json(new { Success = true }); ;
            }
            return Json(new { Success = false, Message = "Unauthorized"}); ;
                
        }

        [Authorize]
        [HttpPost]
        public ActionResult UpdateParticipantStatus(int VideoBattleId, int ParticipantId, VideoBattleParticipantStatus Status)
        {
            var videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId, ParticipantId);
            if(videoBattleParticipant == null)
            {
                //uh oh something is wrong here. why is there no video battle participant. was he not invited?
                return Json(new { Success = false, Message = "Unauthorized" });
            }
            //lets first check the battle for validations
            var videoBattle = _videoBattleService.GetById(videoBattleParticipant.VideoBattleId);
            if (videoBattle == null 
                || videoBattle.VideoBattleStatus != VideoBattleStatus.Open
                || videoBattle.AcceptanceLastDate >= DateTime.UtcNow)
            {
                return Json(new { Success = false, Message = "Battle Closed Or Expired" });
            }


            //so it's there.
            if (videoBattleParticipant.ParticipantStatus == VideoBattleParticipantStatus.Challanged)
            {
                switch (Status)
                {
                    case VideoBattleParticipantStatus.ChallangeAccepted:
                    case VideoBattleParticipantStatus.ChallengeDenied:
                        //only the one who is participant should be able to accept/deny the challenge
                        if (_workContext.CurrentCustomer.Id == ParticipantId)
                        {
                            videoBattleParticipant.ParticipantStatus = Status;
                        }
                        break;
                    case VideoBattleParticipantStatus.ChallengeCancelled:
                        //only the one who challenges or admin can cancel the challenge
                        if (_workContext.CurrentCustomer.IsAdmin() || _workContext.CurrentCustomer.Id == videoBattle.ChallengerId)
                        {
                            videoBattleParticipant.ParticipantStatus = Status;
                        }
                        break;
                }
                _videoBattleParticipantService.Update(videoBattleParticipant);
                return Json(new { Success = true});
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
        /// <param name="VideoFile">The Video File</param>
        /// <returns>JSon response with success as true or false</returns>
        [HttpPost]
        public ActionResult UploadVideo(int VideoBattleId, int ParticipantId, HttpPostedFileBase VideoFile)
        {
            //is there any file to upload
            if (VideoFile == null)
            {
                return Json(new { Success = false, Message = "Missing File" });
            }

            //first lets find out if it's legal to upload video now?
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (videoBattle.ChallengerId != _workContext.CurrentCustomer.Id && videoBattle.VideoBattleStatus != VideoBattleStatus.Open)
            {
                //nopes..the person trying to upload is neither the challenger nor the battle is open
                return Json(new {Success = false, Message = "Unauthorized"});
            }

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
                    var contentType = VideoFile.ContentType;
                   
                    var fileName = Path.GetFileName(VideoFile.FileName);
                    var fileExtension = Path.GetExtension(fileName);
                    if (!string.IsNullOrEmpty(fileExtension))
                        fileExtension = fileExtension.ToLowerInvariant();

                    if (string.IsNullOrEmpty(contentType))
                    {
                        contentType = VideoUtility.GetContentType(fileExtension);
                    }


                    var savePath = ControllerUtil.MobSocialPluginsFolder + "Uploads/" + DateTime.Now.Ticks.ToString() + fileExtension;
                    //save the file
                    VideoFile.SaveAs(savePath);

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

                        //now that we have second video uploaded, we can activate the battle
                        videoBattle.VideoBattleStatus = VideoBattleStatus.Open;
                        _videoBattleService.Update(videoBattle);
                    }
                    else
                    {
                        //so the user has already uploaded the video
                        //we can let the user change a video only if he is a challenger and no other participants are there
                        var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, VideoBattleParticipantStatus.Challanged);
                        if (participants.Count == 0)
                        {
                            //TODO: Delete existing video, should we?
                            videoBattleVideo.VideoPath = savePath;
                            //TODO: Set video status to pending so that admin can approve 
                            videoBattleVideo.VideoStatus = VideoStatus.Approved;
                            _videoBattleService.Update(videoBattle);
                        }
                    }

                }
            }

         
        }
        #endregion

        #region Battle Genres
        #endregion

        #region Video Genres
        #endregion

        #region Video Battles Votes
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
