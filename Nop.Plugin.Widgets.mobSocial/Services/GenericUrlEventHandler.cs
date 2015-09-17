using Nop.Services.Events;
using Nop.Web.Framework.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{

    public partial class GenericUrlEventHandler : IConsumer<CustomUrlRecordEntityNameRequested>
    {
        public void HandleEvent(CustomUrlRecordEntityNameRequested eventMessage)
        {
            if (eventMessage.UrlRecord.EntityName == "Customer")
            {
                eventMessage.RouteData.Values["controller"] = "Profile";
                eventMessage.RouteData.Values["action"] = "Index";
                eventMessage.RouteData.Values["id"] = eventMessage.UrlRecord.EntityId;
                eventMessage.RouteData.Values["SeName"] = eventMessage.UrlRecord.Slug;
            }
            else if (eventMessage.UrlRecord.EntityName == "EventPage")
            {
                eventMessage.RouteData.Values["controller"] = "EventPage";
                eventMessage.RouteData.Values["action"] = "Index";
                eventMessage.RouteData.Values["id"] = eventMessage.UrlRecord.EntityId;
                eventMessage.RouteData.Values["SeName"] = eventMessage.UrlRecord.Slug;
            }
            else if (eventMessage.UrlRecord.EntityName == "BusinessPage")
            {
                eventMessage.RouteData.Values["controller"] = "BusinessPage";
                eventMessage.RouteData.Values["action"] = "Index";
                eventMessage.RouteData.Values["id"] = eventMessage.UrlRecord.EntityId;
                eventMessage.RouteData.Values["SeName"] = eventMessage.UrlRecord.Slug;
            }
            else if (eventMessage.UrlRecord.EntityName == "ArtistPage")
            {
                eventMessage.RouteData.Values["controller"] = "ArtistPage";
                eventMessage.RouteData.Values["action"] = "Index";
                eventMessage.RouteData.Values["id"] = eventMessage.UrlRecord.EntityId;
                eventMessage.RouteData.Values["SeName"] = eventMessage.UrlRecord.Slug;
            }
            else if (eventMessage.UrlRecord.EntityName == "Song")
            {
                eventMessage.RouteData.Values["controller"] = "Song";
                eventMessage.RouteData.Values["action"] = "Index";
                eventMessage.RouteData.Values["id"] = eventMessage.UrlRecord.EntityId;
                eventMessage.RouteData.Values["SeName"] = eventMessage.UrlRecord.Slug;
            }
        }
    }


    
}