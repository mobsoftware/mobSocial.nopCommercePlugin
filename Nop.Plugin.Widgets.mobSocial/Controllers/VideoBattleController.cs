using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Enums;
using System.Web;
using Mob.Core;
using Mob.Core.Services;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Orders;
using Nop.Core.Domain.Payments;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Plugin.Widgets.MobSocial.Extensions;
using Nop.Plugin.Widgets.MobSocial.Helpers;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Catalog;
using Nop.Services.Common;
using Nop.Services.Configuration;
using Nop.Services.Customers;
using Nop.Services.Media;
using Nop.Services.Orders;
using NReco.VideoConverter;

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
        private readonly IVideoBattlePrizeService _videoBattlePrizeService;
        private readonly IVideoGenreService _videoGenreService;
        private readonly ICustomerService _customerService;
        private readonly IMobSocialMessageService _mobsocialMessageService;
        private readonly IWatchedVideoService _watchedVideoService;
        private readonly IVoterPassService _voterPassService;
        private readonly IPictureService _pictureService;
        private readonly ISponsorService _sponsorService;
        private readonly IPriceFormatter _priceFormatter;
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;
        private readonly ISettingService _settingService;
        private readonly IPaymentProcessingService _paymentProcessingService;
        private readonly ICustomerFollowService _customerFollowService;
        private readonly MediaSettings _mediaSettings;
        private readonly mobSocialSettings _mobSocialSettings;

        #region ctor

        public VideoBattleController(
         IWorkContext workContext,
         IStoreContext storeContext,
         IVideoBattleService videoBattleService,
         IVideoBattleParticipantService videoBattleParticipantService,
         IVideoBattleGenreService videoBattleGenreService,
         IVideoBattleVideoService videoBattleVideoService,
         IVideoBattleVoteService videoBattleVoteService,
         IVideoBattlePrizeService videoBattlePrizeService,
         IVideoGenreService videoGenreService,
         ICustomerService customerService,
         IMobSocialMessageService mobsocialMessageService,
         IWatchedVideoService watchedVideoService,
         IVoterPassService voterPassService,
         IPictureService pictureService,
         ISponsorService sponsorService,
            IPriceFormatter priceFormatter,
         MediaSettings mediaSettings,
         mobSocialSettings mobSocialSettings, IOrderService orderService, IProductService productService, ISettingService settingService, IPaymentProcessingService paymentProcessingService, ICustomerFollowService customerFollowService)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _videoBattleService = videoBattleService;
            _videoBattleParticipantService = videoBattleParticipantService;
            _videoBattleGenreService = videoBattleGenreService;
            _videoBattleVideoService = videoBattleVideoService;
            _videoBattleVoteService = videoBattleVoteService;
            _videoBattlePrizeService = videoBattlePrizeService;
            _videoGenreService = videoGenreService;
            _customerService = customerService;
            _mobsocialMessageService = mobsocialMessageService;
            _watchedVideoService = watchedVideoService;
            _voterPassService = voterPassService;
            _mobSocialSettings = mobSocialSettings;
            _orderService = orderService;
            _productService = productService;
            _settingService = settingService;
            _paymentProcessingService = paymentProcessingService;
            _customerFollowService = customerFollowService;
            _sponsorService = sponsorService;
            _pictureService = pictureService;
            _priceFormatter = priceFormatter;
            _mediaSettings = mediaSettings;

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
                VotingStartDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(10) : videoBattle.VotingStartDate.ToLocalTime(), //10 days
                ChallengerId = videoBattle.ChallengerId,
                DateCreated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateCreated,
                DateUpdated = VideoBattleId == 0 ? DateTime.UtcNow : videoBattle.DateUpdated,
                VotingEndDate = VideoBattleId == 0 ? DateTime.UtcNow.AddDays(20) : videoBattle.VotingEndDate.ToLocalTime(), //20 days
                Description = videoBattle.Description,
                Name = videoBattle.Name,
                Id = videoBattle.Id,
                VideoBattleStatus = videoBattle.VideoBattleStatus,
                VideoBattleType = VideoBattleId == 0 ? VideoBattleType.Open : videoBattle.VideoBattleType,
                VideoBattleVoteType = videoBattle.VideoBattleVoteType,
                MaximumParticipantCount = VideoBattleId == 0 ? 10 : videoBattle.MaximumParticipantCount,
                MinimumVotingCharge = VideoBattleId == 0 ? _mobSocialSettings.DefaultVotingChargeForPaidVoting : videoBattle.MinimumVotingCharge,
                IsVotingPayable = videoBattle.IsVotingPayable,
                CanVoterIncreaseVotingCharge = videoBattle.CanVoterIncreaseVotingCharge,
                ParticipantPercentagePerVote = videoBattle.ParticipantPercentagePerVote,
                IsSponsorshipSupported = videoBattle.IsSponsorshipSupported,
                MinimumSponsorshipAmount = videoBattle.MinimumSponsorshipAmount,
                SponsoredCashDistributionType = videoBattle.SponsoredCashDistributionType
            };

            //let's get prizes associated with this battle. prizes can only be added to saved battles
            if (model.Id != 0)
            {
                var prizes = _videoBattlePrizeService.GetBattlePrizes(model.Id).Where(x => !x.IsSponsored);
                foreach (var prize in prizes)
                {
                    model.Prizes.Add(new VideoBattlePrizeModel() {
                        Id = prize.Id,
                        VideoBattleId = prize.VideoBattleId,
                        PrizeType = prize.PrizeType,
                        WinnerId = prize.WinnerId,
                        PrizeAmount = prize.PrizeAmount,
                        Description = prize.Description,
                        PrizeOther = prize.PrizeOther,
                        PrizePercentage = prize.PrizePercentage,
                        WinnerPosition = prize.WinnerPosition,
                        PrizeProductId = prize.PrizeProductId
                    });
                }

            }
            return View("mobSocial/VideoBattle/VideoBattleEditor", model);
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
            videoBattle.Name = Model.Name;
            videoBattle.MaximumParticipantCount = (int)Math.Round((decimal)Model.MaximumParticipantCount);
            videoBattle.IsVotingPayable = Model.MinimumVotingCharge > 0 && Model.IsVotingPayable;
            videoBattle.CanVoterIncreaseVotingCharge = Model.CanVoterIncreaseVotingCharge;
            videoBattle.MinimumVotingCharge = Model.MinimumVotingCharge;
            videoBattle.ParticipantPercentagePerVote = Model.ParticipantPercentagePerVote;
            videoBattle.IsSponsorshipSupported = Model.IsSponsorshipSupported;
            videoBattle.MinimumSponsorshipAmount = Model.MinimumSponsorshipAmount;
            videoBattle.SponsoredCashDistributionType = Model.SponsoredCashDistributionType;

            if (Model.Id == 0)
            {
                videoBattle.VotingStartDate = Model.VotingStartDate.ToUniversalTime();
                videoBattle.VotingEndDate = Model.VotingEndDate.ToUniversalTime();
                _videoBattleService.Insert(videoBattle);
            }
            else
            {
                //its an update...if there is any participant who has accepted the challenge then acceptance date and voting date can only be extended and not shrinked
                if (Model.VotingStartDate.ToUniversalTime() < videoBattle.VotingStartDate || Model.VotingEndDate.ToUniversalTime() < videoBattle.VotingEndDate)
                {
                    //so this is the case. lets see if we have any participants who have accepted the challenge
                    var participants = _videoBattleParticipantService.GetVideoBattleParticipants(Model.Id,
                        VideoBattleParticipantStatus.ChallengeAccepted);
                    if (participants.Count > 0)
                    {
                        //nop, somebody has accepted the challenge. date can only be exended
                        return Json(new { Success = false, Message = "Acceptance and Voting dates can only be extended now, because a participant has accepted the challenge" });
                    }
                }
                videoBattle.VotingStartDate = Model.VotingStartDate.ToUniversalTime();
                videoBattle.VotingEndDate = Model.VotingEndDate.ToUniversalTime();
                if (CanEdit(videoBattle))
                    _videoBattleService.Update(videoBattle);
                else
                {
                    return Json(new { Success = false, Message = "Unauthorized" });
                }
            }
            return Json(new { Success = true, RedirectTo = Url.RouteUrl("VideoBattlePage", new { SeName = videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false) }) });
        }

        [HttpPost]
        public ActionResult SavePrize(VideoBattlePrizeModel Model)
        {
            if (!ModelState.IsValid)
                return Json(new { Success = false, Message = "Invalid" });

            //does the person adding or updating prize own this battle?
            var videoBattle = _videoBattleService.GetById(Model.VideoBattleId);
            if (videoBattle == null || videoBattle.ChallengerId != _workContext.CurrentCustomer.Id)
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }

            VideoBattlePrize prize = null;
            //let's check if the prize is being edited or added
            if (Model.Id == 0)
            {
                prize = new VideoBattlePrize() {
                    DateCreated = DateTime.UtcNow
                };
            }
            else
            {
                prize = _videoBattlePrizeService.GetById(Model.Id);
            }
            prize.DateUpdated = DateTime.UtcNow;
            prize.Description = Model.Description;
            switch (Model.PrizeType)
            {
                case VideoBattlePrizeType.FixedAmount:
                    prize.PrizeAmount = Model.PrizeAmount;
                    break;
                case VideoBattlePrizeType.FixedProduct:
                    prize.PrizeProductId = Model.PrizeProductId;
                    break;
                case VideoBattlePrizeType.PercentageAmount:
                    prize.PrizePercentage = Model.PrizePercentage;
                    break;
                case VideoBattlePrizeType.Other:
                    prize.PrizeOther = Model.PrizeOther;
                    break;
            }

            prize.WinnerId = Model.WinnerId;
            prize.WinnerPosition = Model.WinnerPosition;
            prize.PrizeType = Model.PrizeType;
            prize.VideoBattleId = Model.VideoBattleId;

            if (prize.Id == 0)
                _videoBattlePrizeService.Insert(prize);
            else
                _videoBattlePrizeService.Update(prize);

            return Json(new { Success = true, Id = prize.Id });

        }

        [HttpPost]
        public ActionResult DeletePrize(VideoBattlePrizeModel Model)
        {
            if (!ModelState.IsValid)
                return Json(new { Success = false, Message = "Invalid" });

            //does the person adding or updating prize own this battle?
            var videoBattle = _videoBattleService.GetById(Model.VideoBattleId);
            if (videoBattle == null || videoBattle.ChallengerId != _workContext.CurrentCustomer.Id)
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }

            var prize = _videoBattlePrizeService.GetById(Model.Id);
            if (prize == null)
            {
                return Json(new { Success = false, Message = "Prize doesn't exist" });
            }
            _videoBattlePrizeService.Delete(prize);
            return Json(new { Success = true, Id = prize.Id });
        }

        [HttpPost]
        [Authorize]
        public ActionResult DeleteVideoBattle(int VideoBattleId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);

            //does the video battle exist?
            if (videoBattle == null)
                return Json(new { Success = false, Message = "Video Battle doesn't exist" });

            //only the person who is logged must be the owner of battle or admin
            if (_workContext.CurrentCustomer.IsAdmin() || _workContext.CurrentCustomer.Id == videoBattle.ChallengerId)
            {
                //we should delete all the participants, videos, votes, etc. before deleting battle

                //videos
                var videos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);
                foreach (var video in videos)
                {
                    //delete video file from server
                    System.IO.File.Delete(Server.MapPath(video.VideoPath));

                    _videoBattleVideoService.Delete(video);
                }

                //votes
                var votes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, null);
                foreach (var vote in votes)
                {
                    _videoBattleVoteService.Delete(vote);
                }
                //participants
                var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);
                foreach (var participant in participants)
                {
                    _videoBattleParticipantService.Delete(participant);
                }

            }
            //now delete video battle
            _videoBattleService.Delete(videoBattle);
            return Json(new { Success = true });

        }

        public ActionResult Index(string SeName, VideoViewMode ViewMode = VideoViewMode.Regular)
        {

            //let's get the video battle by it's slug
            var videoBattle = _videoBattleService.GetBySeName(SeName);

            //does the video battle exist?
            if (videoBattle == null)
                return InvokeHttp404();

            var VideoBattleId = videoBattle.Id;
            IList<VideoBattleParticipant> participants = null;

            //it's quite possible that battle is about to open/close and we are waiting for scheduler to open/close the battle...we should lock it then
            //so that nobody can do anything with it now.
            if ((videoBattle.VotingStartDate <= DateTime.UtcNow && videoBattle.VideoBattleStatus == VideoBattleStatus.Pending) ||
                (videoBattle.VotingEndDate <= DateTime.UtcNow && videoBattle.VideoBattleStatus == VideoBattleStatus.Open))
            {
                videoBattle.VideoBattleStatus = VideoBattleStatus.Locked;
                _videoBattleService.Update(videoBattle);
            }

            //only open video battles can be viewed or ofcourse if I am the owner, I should be able to see it open or closed right?
            var canOpen = videoBattle.VideoBattleStatus != VideoBattleStatus.Pending
                        || CanEdit(videoBattle)
                        || (videoBattle.VideoBattleType != VideoBattleType.InviteOnly);

            //still can't open, let's see if it's a participant accessting the page
            if (!canOpen)
            {
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);
                canOpen = participants.Count(x => x.ParticipantId == _workContext.CurrentCustomer.Id) > 0;

            }
            if (!canOpen)
                return InvokeHttp404();

            //get all the participants who have been invited, accepted etc. to the battle
            if (participants == null)
                participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, null);

            //let's exclude participants who haven't accepted the challenge
            if (videoBattle.VideoBattleStatus != VideoBattleStatus.Pending)
            {
                participants =
                    participants.Where(x => x.ParticipantStatus != VideoBattleParticipantStatus.ChallengeDenied).ToList();
            }

            //lets get the videos associated with battle
            var battleVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);

            var challengerVideo = battleVideos.FirstOrDefault(x => x.ParticipantId == videoBattle.ChallengerId);
            var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);

            var challengerVideoModel = new VideoParticipantPublicModel() {
                ParticipantName = challenger.GetFullName(),
                Id = challenger.Id,
                CanEdit = _workContext.CurrentCustomer.Id == videoBattle.ChallengerId,
                ParticipantUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = _workContext.CurrentCustomer.GetSeName(0) }),
                ParticipantProfileImageUrl = _pictureService.GetPictureUrl(challenger.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, false)
            };

            if (challengerVideo != null && (videoBattle.VideoBattleStatus != VideoBattleStatus.Pending || challenger.Id == _workContext.CurrentCustomer.Id))
            {
                challengerVideoModel.VideoPath = challengerVideo.VideoPath;
                challengerVideoModel.ThumbnailPath = _mobSocialSettings.ShowVideoThumbnailsForBattles ? challengerVideo.ThumbnailPath : "";
                challengerVideoModel.MimeType = challengerVideo.MimeType;
                challengerVideoModel.VideoId = challengerVideo.Id;
                //video is marked watched if 1. participant is viewing his own video 2. he has viewed the video
                challengerVideoModel.VideoWatched = challengerVideo.ParticipantId == _workContext.CurrentCustomer.Id || _watchedVideoService.IsVideoWatched(
                    _workContext.CurrentCustomer.Id, challengerVideo.Id, VideoType.BattleVideo);
            }

            var model = new VideoBattlePublicModel {
                Name = videoBattle.Name,
                Description = videoBattle.Description,
                VotingStartDate = videoBattle.VotingStartDate,
                VotingEndDate = videoBattle.VotingEndDate,
                DateCreated = videoBattle.DateCreated,
                DateUpdated = videoBattle.DateUpdated,
                VideoBattleStatus = videoBattle.VideoBattleStatus,
                VideoBattleType = videoBattle.VideoBattleType,
                VideoBattleVoteType = videoBattle.VideoBattleVoteType,
                Id = VideoBattleId,
                RemainingSeconds = GetRemainingSeconds(videoBattle),
                MaximumParticipantCount = videoBattle.MaximumParticipantCount,
                IsUserLoggedIn = _workContext.CurrentCustomer.IsRegistered(),
                LoggedInUserId = _workContext.CurrentCustomer.Id,
                IsVotingPayable = videoBattle.IsVotingPayable,
                CanVoterIncreaseVotingCharge = videoBattle.CanVoterIncreaseVotingCharge,
                MinimumVotingCharge = videoBattle.MinimumVotingCharge,
                ChallengerName = challenger.GetFullName(),
                ChallengerUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = challenger.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                ChallengerProfileImageUrl = challengerVideoModel.ParticipantProfileImageUrl,
                IsSponsorshipSupported = videoBattle.IsSponsorshipSupported,
                MinimumSponsorshipAmount = videoBattle.MinimumSponsorshipAmount
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
                    ParticipantProfileImageUrl = _pictureService.GetPictureUrl(challengee.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, false),
                    Id = challengee.Id,
                    CanEdit = _workContext.CurrentCustomer.Id == participant.ParticipantId,
                    VideoBattleParticipantStatus = participant.ParticipantStatus
                };

                //find if the participant has uploaded video? only those who have accepted challege would be shown 'with videos'
                if (participant.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted && ((videoBattle.VideoBattleStatus != VideoBattleStatus.Pending && videoBattle.VideoBattleStatus != VideoBattleStatus.Locked) || participant.ParticipantId == _workContext.CurrentCustomer.Id))
                {
                    var video = battleVideos.FirstOrDefault(x => x.ParticipantId == participant.ParticipantId);
                    if (video != null)
                    {
                        cModel.VideoPath = video.VideoPath;
                        cModel.MimeType = video.MimeType;
                        cModel.ThumbnailPath = _mobSocialSettings.ShowVideoThumbnailsForBattles ? video.ThumbnailPath : "";
                        cModel.VideoId = video.Id;
                        //video is marked watched if 1. participant is viewing his own video 2. he has viewed the video
                        cModel.VideoWatched = video.ParticipantId == _workContext.CurrentCustomer.Id || _watchedVideoService.IsVideoWatched(
                            _workContext.CurrentCustomer.Id, video.Id, VideoType.BattleVideo);
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

                    //accumulate all vote count
                    model.TotalVotes += participant.TotalVoters;

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
            if (winnerOrLeader != null && videoBattleVotes.Count > 0)
            {
                winnerOrLeader.IsLeading = true;
                if (videoBattle.VideoBattleStatus == VideoBattleStatus.Complete)
                {
                    winnerOrLeader.IsWinner = true;
                }
            }
            //because we use same interface to inviting participants and voters, its necessary that we show the invite box to participants (who have accepted) as well
            //ofcourse with Invite Voters title
            model.IsParticipant = model.Participants.Select(x => x.Id).Contains(_workContext.CurrentCustomer.Id);
            model.IsEditable = CanEdit(videoBattle);
            model.ViewMode = ViewMode;
            model.SeName = videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false);
            model.VideoBattleUrl = _storeContext.CurrentStore.Url + Url.RouteUrl("VideoBattlePage",
                new { SeName = model.SeName });

            //the featured image will be used to display the image on social networks. depending on the status of battle, we either show a default image or 
            //the image of the leader as the featured image 
            model.VideoBattleFeaturedImageUrl = MobSocialConstant.VideoBattleFeaturedImageUrl;
            if (model.VideoBattleStatus != VideoBattleStatus.Pending)
            {
                if (winnerOrLeader != null && winnerOrLeader.ThumbnailPath != null)
                {
                    model.VideoBattleFeaturedImageUrl = winnerOrLeader.ThumbnailPath;
                }
            }
            //and because the image path starts with ~ (a relative path), we need to convert this to url based on store url
            model.VideoBattleFeaturedImageUrl = model.VideoBattleFeaturedImageUrl.Replace("~", _storeContext.CurrentStore.Url);

            //cover image
            if (videoBattle.CoverImageId.HasValue)
                model.VideoBattleCoverImageUrl = _pictureService.GetPictureUrl(videoBattle.CoverImageId.Value);

            //now the sponsors, is it supported? let's find out who are the sponsors
            model.IsSponsorshipSupported = videoBattle.IsSponsorshipSupported;
            var sponsors = _sponsorService.GetSponsorsGrouped(null, videoBattle.Id, BattleType.Video, null);

            var sModel = sponsors.Select(s => s.ToPublicModel(_workContext, _customerService, _pictureService, _sponsorService, _priceFormatter, _mediaSettings)).OrderBy(x => x.SponsorData.DisplayOrder).ToList();
            model.Sponsors = sModel.Where(x => x.SponsorshipStatus == SponsorshipStatus.Accepted).ToList();


            //and is the logged in user a sponsor?
            model.CurrentSponsor = sModel.FirstOrDefault(x => x.CustomerId == _workContext.CurrentCustomer.Id);
            model.IsSponsor = model.CurrentSponsor != null;

            //prizes
            var allPrizes = _videoBattlePrizeService.GetBattlePrizes(videoBattle.Id);
            model.ConsolidatedPrizesDisplay = videoBattle.GetConsolidatedPrizesString(allPrizes.ToList(), null,
                _workContext, _productService, _sponsorService, _voterPassService, _videoBattlePrizeService,
                _priceFormatter, _settingService, _paymentProcessingService, _mobSocialSettings);

            //following or not
            model.IsFollowing =
                _customerFollowService.GetCustomerFollow<VideoBattle>(_workContext.CurrentCustomer.Id, VideoBattleId) !=
                null;
            //and howmany are following
            model.TotalFollowerCount = _customerFollowService.GetFollowerCount<VideoBattle>(VideoBattleId);

            return View(ViewMode == VideoViewMode.TheaterMode && videoBattle.VideoBattleStatus != VideoBattleStatus.Pending ? "mobSocial/VideoBattle/Single.TheaterView" : "mobSocial/VideoBattle/Single", model);
        }

        public ActionResult VideoBattles(string viewType = "open", string searchTerm = "", BattlesSortBy sortBy = BattlesSortBy.Id, SortOrder sortOrder = SortOrder.Ascending)
        {
            var model = new VideoBattleQueryModel() {
                SearchTerm = searchTerm,
                ViewType = viewType,
                SortOrder = sortOrder,
                BattlesSortBy = sortBy,
                Count = 15,
                Page = 1
            };
            return View("mobSocial/VideoBattle/VideoBattles", model);
        }

        /// <summary>
        /// Loads battles using ajax
        /// </summary>
        [HttpPost]
        public ActionResult GetBattles(VideoBattleQueryModel requestModel)
        {
            if (requestModel.Count == 0)
                requestModel.Count = 15;

            if (requestModel.Page <= 0)
                requestModel.Page = 1;

           if(!requestModel.BattlesSortBy.HasValue)
               requestModel.BattlesSortBy = BattlesSortBy.Id;

            if(!requestModel.SortOrder.HasValue)
                requestModel.SortOrder = SortOrder.Descending;

            //let's get all the battles depending on view type
            IList<VideoBattle> battles = null;
            int totalPages = 0;
            switch (requestModel.ViewType)
            {
                case "open":
                    battles = _videoBattleService.GetAll(null, null, null, VideoBattleStatus.Open, null, null, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "open-to-join":
                    battles = _videoBattleService.GetAll(null, null, null, VideoBattleStatus.Pending, VideoBattleType.Open, null, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "challenged":
                    battles = _videoBattleService.GetAll(null, _workContext.CurrentCustomer.Id, null, VideoBattleStatus.Pending, null, null, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "closed":
                    //either closed or complete..whichever it is so first get all of them
                    battles = _videoBattleService.GetAll(null, null, null, null, null, null, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, 1, int.MaxValue);

                    battles =
                        battles.Where(
                            x =>
                                x.VideoBattleStatus == VideoBattleStatus.Closed ||
                                x.VideoBattleStatus == VideoBattleStatus.Complete)
                            .ToList();
                    totalPages = int.Parse(Math.Ceiling((decimal)battles.Count() / requestModel.Count).ToString());

                    battles = battles.Skip((requestModel.Page - 1) * requestModel.Count)
                        .Take(requestModel.Count).ToList();

                    break;
                case "my":
                    battles = _videoBattleService.GetAll(_workContext.CurrentCustomer.Id, null, null, null, null, null, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "search":
                    battles = _videoBattleService.GetAll(null, null, null, null, VideoBattleType.Open, null, requestModel.SearchTerm, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "sponsor":
                    battles = _videoBattleService.GetAll(_workContext.CurrentCustomer.Id, null, null, null, null, true, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
                    battles = battles.ToList();
                    break;
                case "user":
                    if (requestModel.CustomerId == 0)
                        requestModel.CustomerId = _workContext.CurrentCustomer.Id;
                    battles = _videoBattleService.GetAll(requestModel.CustomerId, null, null, null, null, true, string.Empty, requestModel.BattlesSortBy, requestModel.SortOrder, out totalPages, requestModel.Page, requestModel.Count);
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
                    if (challenger == null)
                        continue;

                    var battleVideos = _videoBattleVideoService.GetBattleVideos(videoBattle.Id);

                    var thumbnailVideo = battleVideos.FirstOrDefault(x => !string.IsNullOrEmpty(x.ThumbnailPath));

                    var thumbnailUrl = MobSocialConstant.VideoBattleFeaturedImageUrl;
                    if (thumbnailVideo != null && videoBattle.VideoBattleStatus != VideoBattleStatus.Pending)
                        thumbnailUrl = thumbnailVideo.ThumbnailPath;

                    //and relative path to url
                    thumbnailUrl = thumbnailUrl.Replace("~", _storeContext.CurrentStore.Url);

                    //prizes
                    var allPrizes = _videoBattlePrizeService.GetBattlePrizes(videoBattle.Id);


                    model.Add(new VideoBattlePublicModel() {
                        Name = videoBattle.Name,
                        Description = videoBattle.Description,
                        VotingStartDate = videoBattle.VotingStartDate,
                        VotingEndDate = videoBattle.VotingEndDate,
                        DateCreated = videoBattle.DateCreated,
                        DateUpdated = videoBattle.DateUpdated,
                        VideoBattleStatus = videoBattle.VideoBattleStatus,
                        VideoBattleType = videoBattle.VideoBattleType,
                        VideoBattleVoteType = videoBattle.VideoBattleVoteType,
                        Id = videoBattle.Id,
                        IsEditable = CanEdit(videoBattle),
                        ChallengerName = challenger.GetFullName(),
                        ChallengerUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = challenger.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                        VideoBattleUrl = Url.RouteUrl("VideoBattlePage", new { SeName = videoBattle.GetSeName(_workContext.WorkingLanguage.Id, true, false) }),
                        RemainingSeconds = GetRemainingSeconds(videoBattle),
                        VideoBattleFeaturedImageUrl = thumbnailUrl,
                        ChallengerProfileImageUrl = _pictureService.GetPictureUrl(challenger.GetAttribute<int>(SystemCustomerAttributeNames.AvatarPictureId), _mediaSettings.AvatarPictureSize, false),
                        IsSponsorshipSupported = videoBattle.IsSponsorshipSupported,
                        MinimumSponsorshipAmount = videoBattle.MinimumSponsorshipAmount,
                        ConsolidatedPrizesDisplay = videoBattle.GetConsolidatedPrizesString(allPrizes.ToList(), null,
                        _workContext, _productService, _sponsorService, _voterPassService, _videoBattlePrizeService,
                        _priceFormatter, _settingService, _paymentProcessingService, _mobSocialSettings)
                    });
                }
            }
            return Json(new {
                Success = true,
                VideoBattles = model,
                TotalPages = totalPages
            });
        }

        [HttpPost]
        public ActionResult GetPrizeDetails(int VideoBattleId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (videoBattle == null)
                return Json(new { Success = false, Message = "Battle not found" });

            var battleOwner = _customerService.GetCustomerById(videoBattle.ChallengerId);
            var customerName = "";
            var customerUrl = "";
            if (battleOwner != null)
            {
                customerName = battleOwner.GetFullName();
                customerUrl = Url.RouteUrl("CustomerProfileUrl",
                    new { SeName = battleOwner.GetSeName(_workContext.WorkingLanguage.Id, true, false) });
            }

            var prizes = _videoBattlePrizeService.GetBattlePrizes(VideoBattleId);

            var totalWinnerCount = prizes.Count(x => !x.IsSponsored);

            var model = new List<VideoBattlePrizePublicModel>();

            for (var winnerPosition = 1; winnerPosition <= totalWinnerCount; winnerPosition++)
            {
                var consolidatedString = videoBattle.GetConsolidatedPrizesString(prizes.ToList(), winnerPosition,
                    _workContext, _productService, _sponsorService, _voterPassService, _videoBattlePrizeService,
                    _priceFormatter, _settingService, _paymentProcessingService, _mobSocialSettings);

                var prizeModel = new VideoBattlePrizePublicModel() {
                    WinningPosition = "Winner # " + winnerPosition.ToString(),
                    SponsorCustomerUrl = customerUrl,
                    SponsorName = customerName,
                    FormattedPrize = consolidatedString
                };

                model.Add(prizeModel);

            }
            /*
            //and the sponsorships 
            var sponsorships = _sponsorService.GetSponsorsGrouped(null, VideoBattleId, BattleType.Video,
                SponsorshipStatus.Accepted);

            var sponsorData = _sponsorService.GetSponsorData(VideoBattleId, BattleType.Video);

            foreach (var sponsor in sponsorData)
            {
                var sponsorCustomer = _customerService.GetCustomerById(sponsor.SponsorCustomerId);
                var amount = sponsorships.Where(x => x.CustomerId == sponsorCustomer.Id).Sum(x => x.SponsorshipAmount);
                if (string.IsNullOrEmpty(sponsor.DisplayName))
                    sponsor.DisplayName = sponsorCustomer.GetFullName();

                model.Add(new VideoBattlePrizePublicModel() {
                    PrizeType = "Sponsorship by " + sponsor.DisplayName,
                    WinningPosition = "Sponsored Prize",
                    FormattedPrize = _priceFormatter.FormatPrice(amount, true, _workContext.WorkingCurrency),
                    SponsorName = sponsorCustomer.GetFullName(),
                    SponsorCustomerUrl = Url.RouteUrl("CustomerProfileUrl", new { SeName = sponsorCustomer.GetSeName(_workContext.WorkingLanguage.Id, true, false) })
                });
            }
            */
            return Json(new {
                Success = true,
                Prizes = model
            });

        }

        [HttpPost]
        public ActionResult UploadPicture(int VideoBattleId, IEnumerable<HttpPostedFileBase> file)
        {

            //first get battle
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (!CanEdit(videoBattle))
                return Json(new { Success = false, Message = "Unauthorized" });

            var files = file.ToList();
            var newImages = new List<object>();
            foreach (var fi in files)
            {
                Stream stream = null;
                var fileName = "";
                var contentType = "";

                if (file == null)
                    throw new ArgumentException("No file uploaded");

                stream = fi.InputStream;
                fileName = Path.GetFileName(fi.FileName);
                contentType = fi.ContentType;

                var fileBinary = new byte[stream.Length];
                stream.Read(fileBinary, 0, fileBinary.Length);

                var fileExtension = Path.GetExtension(fileName);
                if (!string.IsNullOrEmpty(fileExtension))
                    fileExtension = fileExtension.ToLowerInvariant();


                if (string.IsNullOrEmpty(contentType))
                {
                    contentType = PictureUtility.GetContentType(fileExtension);
                }

                var picture = _pictureService.InsertPicture(fileBinary, contentType, null);


                var videoBattlePicture = new VideoBattlePicture() {
                    EntityId = VideoBattleId,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now,
                    DisplayOrder = 1,
                    PictureId = picture.Id
                };

                _videoBattleService.InsertPicture(videoBattlePicture);
                newImages.Add(new {
                    ImageUrl = _pictureService.GetPictureUrl(videoBattlePicture.PictureId),
                    ImageId = videoBattlePicture.PictureId
                });
            }

            return Json(new { Success = true, Images = newImages });
        }

        [HttpPost]
        [Authorize]
        public ActionResult SetPictureAsCover(int VideoBattleId, int PictureId)
        {
            //first get battle & check if it's editable
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (!CanEdit(videoBattle))
                return Json(new { Success = false, Message = "Unauthorized" });

            videoBattle.CoverImageId = PictureId;
            _videoBattleService.Update(videoBattle);
            return Json(new { Success = true });
        }

        #endregion

        #region Participants

        [HttpPost]
        [Authorize]
        public ActionResult InviteParticipants(int VideoBattleId, IList<int> ParticipantIds, IList<string> Emails)
        {
            //first check if it's a valid videobattle and the logged in user can actually invite
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            var model = new List<object>();
            if (CanInvite(videoBattle))
            {
                if (ParticipantIds != null)
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
                }

                if (Emails != null)
                {
                    //and direct email invites
                    foreach (var email in Emails)
                    {
                        _mobsocialMessageService.SendSomeoneChallengedYouForABattleNotification(
                            _workContext.CurrentCustomer, email, email, videoBattle, _workContext.WorkingLanguage.Id,
                            _storeContext.CurrentStore.Id);

                        model.Add(new {
                            Success = true,
                            Email = email,
                        });

                    }
                }

                return Json(model);

            }
            return Json(new { Success = false, Message = "Unauthorized" });
            ;

        }

        [HttpPost]
        [Authorize]
        public ActionResult JoinBattle(int VideoBattleId)
        {
            //first check if it's a valid videobattle and the logged in user can actually invite
            var videoBattle = _videoBattleService.GetById(VideoBattleId);


            if (videoBattle == null)
                return Json(new { Success = false, Message = "Battle not found" });

            //in any case a sponsor can't join a battle
            if (_sponsorService.IsSponsor(_workContext.CurrentCustomer.Id, VideoBattleId, BattleType.Video))
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }
            //only open or signup battle types can be joined directly. it should not be open in status either way
            if (videoBattle.VideoBattleType != VideoBattleType.InviteOnly && videoBattle.VideoBattleStatus == VideoBattleStatus.Pending)
            {
                //get the current customer
                var customer = _workContext.CurrentCustomer;

                //get the participation status
                var status = _videoBattleParticipantService.GetParticipationStatus(VideoBattleId, customer.Id);
                //get all participants to get count of total, we can't allow if count reaches a max limit for open battles
                if (videoBattle.VideoBattleType == VideoBattleType.Open)
                {
                    var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId, VideoBattleParticipantStatus.ChallengeAccepted);
                    if (participants.Count == videoBattle.MaximumParticipantCount && videoBattle.MaximumParticipantCount > 0)
                    {
                        //nop, can't join now
                        return Json(new { Success = false, Message = "No more participants allowed" });
                    }

                }

                if (status == VideoBattleParticipantStatus.NotChallenged)
                {
                    //not challenged so it's a valid request
                    var videoBattleParticipant = new VideoBattleParticipant {
                        ParticipantId = customer.Id,
                        VideoBattleId = VideoBattleId,
                        LastUpdated = DateTime.UtcNow,
                        //depending on the type of battle, the challenge is either accepted directly or marked for approval
                        ParticipantStatus = videoBattle.VideoBattleType == VideoBattleType.Open
                            ? VideoBattleParticipantStatus.ChallengeAccepted
                            : VideoBattleParticipantStatus.SignedUp
                    };


                    //and save it
                    _videoBattleParticipantService.Insert(videoBattleParticipant);

                    //send notification to challenger (the battle host)
                    var challenger = _customerService.GetCustomerById(videoBattle.ChallengerId);
                    var challengee = _workContext.CurrentCustomer;
                    if (videoBattleParticipant.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted)
                    {
                        //open battle
                        _mobsocialMessageService.SendVideoBattleJoinNotification(challenger, challengee, videoBattle,
                            _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);

                    }
                    else
                    {
                        _mobsocialMessageService.SendVideoBattleSignupNotification(challenger, challengee, videoBattle,
                               _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);


                    }

                    //and add user to the followers list
                    _customerFollowService.Insert<VideoBattle>(customer.Id, VideoBattleId);

                    return Json(new { Success = true, Status = videoBattleParticipant.ParticipantStatus });

                }
            }
            return Json(new { Success = false, Message = "No more participants allowed" });

        }

        [Authorize]
        [HttpPost]
        public ActionResult UpdateParticipantStatus(int VideoBattleId, VideoBattleParticipantStatus VideoBattleParticipantStatus, int ParticipantId)
        {
            var videoBattle = _videoBattleService.GetById(VideoBattleId);

            if (videoBattle == null)
            {
                //which video battle are you talking about?
                return Json(new { Success = false, Message = "Video battle doesn't exist" });
            }
            if (_workContext.CurrentCustomer.Id != ParticipantId && _workContext.CurrentCustomer.Id != videoBattle.ChallengerId)
            {
                //somebody is not allowed to update status
                return Json(new { Success = false, Message = "Unauthorized" });
            }

            var videoBattleParticipant = _videoBattleParticipantService.GetVideoBattleParticipant(VideoBattleId, ParticipantId);
            if (videoBattleParticipant == null)
            {
                //uh oh something is wrong here. why is there no video battle participant. was he not invited?
                return Json(new { Success = false, Message = "Unauthorized" });
            }
            //lets first check the battle for validations

            if (videoBattle.VideoBattleStatus != VideoBattleStatus.Pending
                || videoBattle.VotingStartDate < DateTime.UtcNow)
            {
                return Json(new { Success = false, Message = "Battle Closed Or Expired" });
            }


            //so it's there. it must be the person who has signedup for the battle or who has been challenged
            if (videoBattleParticipant.ParticipantStatus == VideoBattleParticipantStatus.Challenged
                || videoBattleParticipant.ParticipantStatus == VideoBattleParticipantStatus.SignedUp)
            {
                switch (VideoBattleParticipantStatus)
                {
                    case VideoBattleParticipantStatus.ChallengeAccepted:
                    case VideoBattleParticipantStatus.ChallengeDenied:
                        //only the one who is participant should be able to accept/deny the challenge
                        //or if it's an signup battle, battle owner can approve
                        if ((_workContext.CurrentCustomer.Id == ParticipantId && videoBattle.VideoBattleType != VideoBattleType.SignUp)
                            || (_workContext.CurrentCustomer.Id == videoBattle.ChallengerId && videoBattle.VideoBattleType == VideoBattleType.SignUp))
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

                //send some notifications
                if (_workContext.CurrentCustomer.Id == videoBattle.ChallengerId &&
                    videoBattle.VideoBattleType == VideoBattleType.SignUp)
                {
                    //this is the request approved by battle owner or admin so notification will be sent to the participant
                    var challengee = _customerService.GetCustomerById(videoBattleParticipant.ParticipantId);
                    var challenger = _workContext.CurrentCustomer;
                    _mobsocialMessageService.SendVideoBattleSignupAcceptedNotification(challenger, challengee,
                        videoBattle, _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                }

                return Json(new { Success = true, ParticipantStatus = (int)videoBattleParticipant.ParticipantStatus, ParticipantId = ParticipantId });
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

                    var tickString = DateTime.Now.Ticks.ToString();
                    var savePath = ControllerUtil.MobSocialPluginsFolder + "Uploads/" + tickString + fileExtension;
                    //save the file
                    File.SaveAs(Server.MapPath(savePath));

                    //wanna generate the thumbnails for videos...ffmpeg is our friend
                    var ffmpeg = new FFMpegConverter();
                    var thumbnailFilePath = ControllerUtil.MobSocialPluginsFolder + "Uploads/" + tickString + ".thumb.jpg";
                    ffmpeg.GetVideoThumbnail(Server.MapPath(savePath), Server.MapPath(thumbnailFilePath));
                    //TODO: Generate thumbnails of different sizes to save bandwidth

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
                            DateUploaded = DateTime.UtcNow,
                            DateCreated = DateTime.UtcNow,
                            DateUpdated = DateTime.UtcNow,
                            ThumbnailPath = thumbnailFilePath
                        };
                        _videoBattleVideoService.Insert(videoBattleVideo);

                        //UNCOMMENT THE LINES BELOW IF YOU WISH TO OPEN THE BATTLES AS SOON AS VIDEOS ARE UPLOADED. NOTE IT USES APPROPRIATE CHECKS BEFORE MARKING THE BATTLE LOCKED

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

                        //set the thumbnail 
                        //TODO: Delete existing thunbnail?
                        videoBattleVideo.ThumbnailPath = thumbnailFilePath;

                        videoBattleVideo.DateUpdated = DateTime.UtcNow;
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
                        ThumbnailPath = videoBattleVideo.ThumbnailPath,
                        MimeType = videoBattleVideo.MimeType,
                        ParticipantId = videoBattleParticipant != null ? videoBattleParticipant.ParticipantId : _workContext.CurrentCustomer.Id
                    });

                }
            }

            return Json(new { Success = false, Message = "Unauthorized" });
        }

        /// <summary>
        /// Marks the video battle video watched
        /// </summary>
        /// <param name="VideoBattleVideoId">The ID of Video Battle video</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public ActionResult MarkVideoWatched(int VideoBattleId, int ParticipantId, int VideoBattleVideoId)
        {

            //has the user already watched the video?
            if (_watchedVideoService.IsVideoWatched(_workContext.CurrentCustomer.Id, VideoBattleVideoId,
                VideoType.BattleVideo))
            {
                return Json(new { Success = true });
            }

            //the video must exist before it can be marked watched
            var videoBattleVideo = _videoBattleVideoService.GetBattleVideo(VideoBattleId, ParticipantId);
            if (videoBattleVideo == null)
            {
                return Json(new { Success = false, Message = "Invalid Video" });
            }

            //mark the video watched now
            var watchedVideo = new WatchedVideo() {
                CustomerId = _workContext.CurrentCustomer.Id,
                VideoId = VideoBattleVideoId,
                VideoType = VideoType.BattleVideo,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now
            };
            _watchedVideoService.Insert(watchedVideo);

            return Json(new { Success = true });

        }
        #endregion

        #region Battle Genres
        #endregion

        #region Video Genres
        #endregion

        #region Video Battles Votes

        [Authorize]
        [HttpPost]
        public ActionResult VoteBattle(int VideoBattleId, int ParticipantId, int VoteValue, int VoterPassOrderId = 0)
        {
            var customer = _workContext.CurrentCustomer;
            //should not vote himself or herself
            if (customer.Id == ParticipantId)
            {
                return Json(new { Success = false, Message = "You can't vote yourself" });
            }

            //in any case a sponsor can't vote a battle
            if (_sponsorService.IsSponsor(_workContext.CurrentCustomer.Id, VideoBattleId, BattleType.Video))
            {
                return Json(new { Success = false, Message = "Unauthorized" });
            }

            //has the person watched all the videos before voting can be done
            //get all the videos of current battle
            var battleVideos = _videoBattleVideoService.GetBattleVideos(VideoBattleId);
            //and now watched videos
            var watchedVideos = _watchedVideoService.GetWatchedVideos(null, customer.Id, VideoType.BattleVideo);





            //if the person voting is already a participant in the battle then one of his own videos need not be watched. 
            var battleVideosIds = battleVideos.Where(x => x.ParticipantId != customer.Id).Select(x => x.Id);
            //only current battle videos
            var watchedVideosIds = watchedVideos.Where(x => battleVideosIds.Contains(x.VideoId)).Select(x => x.VideoId);

            if (watchedVideosIds.Count() != battleVideosIds.Count())
            {
                return Json(new { Success = false, Message = "You haven't watched all videos" });
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
                        return Json(new { Success = false, Message = "Already Voted" });

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

                    //is this a paid battle, if it is, then user must pay first before proceeding
                    if (videoBattle.IsVotingPayable)
                    {
                        if (VoterPassOrderId == 0)
                        {
                            //not paid yet...return an error to pay
                            return Json(new { Success = false, Message = "No voterpass purchased" });
                        }

                        //is the voter pass already used
                        var voterPass = _voterPassService.GetVoterPassByOrderId(VoterPassOrderId);
                        if (voterPass == null || voterPass.Status == PassStatus.Used)
                        {
                            return Json(new { Success = false, Message = "Voterpass already used" });
                        }
                        if (voterPass.CustomerId != _workContext.CurrentCustomer.Id)
                        {
                            //somebody else...return an error
                            return Json(new { Success = false, Message = "Invalid voter pass id" });
                        }

                        //so let's mark this voter pass as used
                        _voterPassService.MarkVoterPassUsed(VoterPassOrderId);

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
                //and add user to the followers list
                _customerFollowService.Insert<VideoBattle>(customer.Id, VideoBattleId);

                return Json(new { Success = true });
            }
            return Json(new { Success = false, Message = "Closed For Voting" });
        }

        [HttpPost]
        [Authorize]
        public ActionResult InviteVoters(int VideoBattleId, IList<int> VoterIds, IList<string> Emails)
        {
            //first check if it's a valid videobattle and the logged in user can actually invite
            var videoBattle = _videoBattleService.GetById(VideoBattleId);
            if (videoBattle == null)
                return Json(new { Success = false, Message = "Invalid battle" });

            var participants = _videoBattleParticipantService.GetVideoBattleParticipants(VideoBattleId,
                VideoBattleParticipantStatus.ChallengeAccepted);

            var model = new List<object>();
            if (CanInvite(videoBattle) || participants.Select(x => x.ParticipantId).Contains(_workContext.CurrentCustomer.Id))
            {
                if (VoterIds != null)
                {
                    var votes = _videoBattleVoteService.GetVideoBattleVotes(VideoBattleId, null);

                    foreach (var vi in VoterIds)
                    {
                        var vote = votes.FirstOrDefault(x => x.UserId == vi);
                        if (vote == null)
                        {
                            vote = new VideoBattleVote() {
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
                }

                if (Emails != null)
                {
                    //and direct email invites
                    foreach (var email in Emails)
                    {
                        _mobsocialMessageService.SendVotingReminderNotification(
                            _workContext.CurrentCustomer, email, email, videoBattle, _workContext.WorkingLanguage.Id,
                            _storeContext.CurrentStore.Id);
                        model.Add(new {
                            Success = true,
                            Email = email,
                        });
                    }
                }


                return Json(model);

            }
            return Json(new { Success = false, Message = "Unauthorized" });
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
            return VideoBattle.VideoBattleStatus != VideoBattleStatus.Complete
                   && VideoBattle.VideoBattleStatus != VideoBattleStatus.Closed
                   &&
                   ((_workContext.CurrentCustomer.Id == VideoBattle.ChallengerId &&
                     VideoBattle.VideoBattleType == VideoBattleType.InviteOnly) //page owner
                    || VideoBattle.VideoBattleType == VideoBattleType.Open
                    || _workContext.CurrentCustomer.IsAdmin()); //administrator
        }

        /// <summary>
        /// Returns remaining seconds of a battle for opening the battle (if it's pending) or completing the battle (if it's locked)
        /// </summary>
        /// <returns></returns>
        int GetRemainingSeconds(VideoBattle VideoBattle)
        {
            var now = DateTime.UtcNow;
            var endDate = DateTime.UtcNow;

            if (VideoBattle.VideoBattleStatus == VideoBattleStatus.Pending && VideoBattle.VotingStartDate > now)
            {
                endDate = VideoBattle.VotingStartDate;
            }
            else if (VideoBattle.VideoBattleStatus == VideoBattleStatus.Open)
            {
                endDate = VideoBattle.VotingEndDate;
            }
            var diffDate = endDate.Subtract(now);
            var maxSeconds = Convert.ToInt32(diffDate.TotalSeconds);
            return maxSeconds;
        }

        #endregion
    }
}
