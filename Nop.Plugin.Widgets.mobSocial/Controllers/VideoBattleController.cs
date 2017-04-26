using System.Web.Mvc;
using mobSocial.Data.Enum;
using mobSocial.WebApi.Models.Battles;
using Nop.Web.Controllers;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class VideoBattleController : BasePublicController
    {
        #region Battles

        [Authorize]
        public ActionResult VideoBattleEditor(int VideoBattleId = 0)
        {
            var model = new BattleEditorModel()
            {
                Id = VideoBattleId
            };
            return View("mobSocial/VideoBattle/VideoBattleEditor", model);
        }

        public ActionResult Index(string SeName, VideoViewMode ViewMode = VideoViewMode.Regular)
        {
            var model = new VideoBattleIndexModel()
            {
                SeName = SeName,
                ViewMode = ViewMode
            };
            return View(ViewMode == VideoViewMode.TheaterMode ? "mobSocial/VideoBattle/Single.TheaterView" : "mobSocial/VideoBattle/Single", model);
        }

        public ActionResult VideoBattles(string viewType = "open", string searchTerm = "", BattlesSortBy sortBy = BattlesSortBy.Id, SortOrder sortOrder = SortOrder.Descending)
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

        #endregion
    }
}
