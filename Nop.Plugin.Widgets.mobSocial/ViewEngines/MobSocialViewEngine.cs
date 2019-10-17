using Nop.Plugin.Widgets.MobSocial.Constants;

namespace Nop.Plugin.Widgets.MobSocial.ViewEngines
{
    public class MobSocialViewEngine : ThemeableRazorViewEngine
    {
        public MobSocialViewEngine()
        {
            PartialViewLocationFormats = new[]{
                MobSocialConstant.PluginPath + "/Views/{0}.cshtml",
                MobSocialConstant.ThemePath + "/Views/{1}/{0}.cshtml"
            };
            ViewLocationFormats = new[]{
                MobSocialConstant.PluginPath + "/Views/{0}.cshtml",
                MobSocialConstant.ThemePath + "/Views/{1}/{0}.cshtml"
            };
        }
    }
}
