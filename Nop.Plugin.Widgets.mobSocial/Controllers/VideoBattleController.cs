using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Models;
using Nop.Web.Controllers;

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

        #region ctor

        public VideoBattleController(
         IWorkContext workContext,
         IStoreContext storeContext,
         IVideoBattleService videoBattleService,
         IVideoBattleParticipantService videoBattleParticipantService,
         IVideoBattleGenreService videoBattleGenreService,
         IVideoBattleVideoService videoBattleVideoService,
         IVideoBattleVoteService videoBattleVoteService,
         IVideoGenreService videoGenreService)
        {
            _workContext = workContext;
            _storeContext = storeContext;
            _videoBattleService = videoBattleService;
            _videoBattleParticipantService = videoBattleParticipantService;
            _videoBattleGenreService = videoBattleGenreService;
            _videoBattleVideoService = videoBattleVideoService;
            _videoBattleVoteService = videoBattleVoteService;
            _videoGenreService = videoGenreService;
        }
        #endregion

        #region Battles

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
            }
            else
            {
                videoBattle = _videoBattleService.GetById(Model.Id);
            }

            videoBattle.AcceptanceLastDate = Model.AcceptanceLastDate;
            videoBattle.ChallengerId = Model.ChallengerId;
            videoBattle.DateUpdated = DateTime.UtcNow;
            videoBattle.Description = Model.Description;
            videoBattle.VideoBattleStatus = Model.VideoBattleStatus;
            videoBattle.VideoBattleType = Model.VideoBattleType;
            videoBattle.VideoBattleVoteType = Model.VideoBattleVoteType;
            if (Model.Id == 0)
            {
                videoBattle.DateCreated = DateTime.UtcNow;
                _videoBattleService.Insert(videoBattle);
            }
            else
            {
                _videoBattleService.Update(videoBattle);
            }
            return null;
        }

        #endregion

        #region Participants
        #endregion

        #region Videos
        #endregion

        #region Battle Genres
        #endregion

        #region Video Genres
        #endregion

        #region Video Battles Votes
        #endregion

    }
}
