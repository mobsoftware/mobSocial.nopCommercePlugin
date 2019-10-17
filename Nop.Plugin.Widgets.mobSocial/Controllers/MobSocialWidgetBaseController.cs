using Microsoft.AspNetCore.Mvc;
using Nop.Plugin.Widgets.MobSocial.Attributes;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Web.Framework.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    [MobSocialPage]
    public class MobSocialWidgetBaseController : BaseController
    {
        public new IActionResult View<TModel>(string viewName, TModel model)
        {
            return base.View(MobSocialConstant.ViewsPath + "/" + viewName + ".cshtml", model);
        }

        public new IActionResult View(string viewName)
        {
            return base.View(MobSocialConstant.ViewsPath + "/" + viewName + ".cshtml");
        }
    }
}