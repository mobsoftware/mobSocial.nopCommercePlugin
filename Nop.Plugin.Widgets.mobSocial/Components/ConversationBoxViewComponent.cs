using Microsoft.AspNetCore.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Components
{
    [ViewComponent(Name = ViewName)]
    public class ConversationBoxViewComponent : MobSocialViewComponent
    {
        public const string ViewName = "MobSocialConversationBox";
        /// <summary>
        /// Invoke view component
        /// </summary>
        /// <param name="widgetZone">Widget zone name</param>
        /// <param name="additionalData">Additional data</param>
        /// <returns>View component result</returns>
        public IViewComponentResult Invoke(string widgetZone, object additionalData)
        {
            return View("mobSocial/WidgetZones/body_end_html_tag_before");
        }
    }
}