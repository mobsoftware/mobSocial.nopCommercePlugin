using System.Web.Mvc;
using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class VideoBattleController : MobSocialWidgetBaseController
    {
        #region Battles

        [Authorize]
        public ActionResult VideoBattleEditor(int videoBattleId = 0)
        {
            var model = new BattleEditorModel()
            {
                Id = videoBattleId
            };
            return View("mobSocial/VideoBattle/VideoBattleEditor", model);
        }

        public ActionResult Index(string seName, string viewMode)
        {
            var model = new VideoBattleIndexModel()
            {
                SeName = seName,
                ViewMode = viewMode
            };
            return View(viewMode == "TheaterMode" ? "mobSocial/VideoBattle/Single.TheaterView" : "mobSocial/VideoBattle/Single", model);
        }

        public ActionResult VideoBattles(string viewType = "open", string searchTerm = "", string sortBy = "Id", string sortOrder = "Descending")
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
