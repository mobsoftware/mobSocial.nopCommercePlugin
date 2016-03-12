using Nop.Plugin.Widgets.MobSocial.Models;

namespace Nop.Plugin.Widgets.MobSocial.Feature.Timeline
{
    public interface ITimelineWidget
    {
        /// <summary>
        /// The widget display order
        /// </summary>
        int DisplayOrder { get; }

        /// <summary>
        /// Gets the name of post type e.g. video, videourl, audio, audiourl, location etc.
        /// </summary>
        string PostTypeName { get; }

        /// <summary>
        /// Gets the view path of the widget
        /// </summary>
        RouteDataModel GetWidgetRoute();
      
        /// <summary>
        /// Is the widget active?
        /// </summary>
        bool IsActive();

        /// <summary>
        /// Gets the post display view route values
        /// </summary>
        /// <returns></returns>
        RouteDataModel GetPostDisplayRoute();

        /// <summary>
        /// Gets the post preview route values
        /// </summary>
        /// <returns></returns>
        RouteDataModel GetPostPreviewRoute();

    }
}
