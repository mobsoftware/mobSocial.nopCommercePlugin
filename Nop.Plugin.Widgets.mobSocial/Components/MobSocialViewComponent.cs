using Microsoft.AspNetCore.Mvc.ViewComponents;
using Nop.Plugin.Widgets.MobSocial.Constants;
using Nop.Web.Framework.Components;

namespace Nop.Plugin.Widgets.MobSocial.Components
{
    public abstract class MobSocialViewComponent : NopViewComponent
    {
        public new ViewViewComponentResult View<TModel>(string viewName, TModel model)
        {
            return base.View(MobSocialConstant.ViewsPath + "/" + viewName + ".cshtml", model);
        }

        public new ViewViewComponentResult View(string viewName)
        {
            return base.View(MobSocialConstant.ViewsPath + "/" + viewName + ".cshtml");
        }
    }
}