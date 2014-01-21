
using Nop.Core.Configuration;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialSettings : ISettings
    {
        public int ProfilePictureSize { get; set; }
        public string WidgetZone { get; set; }

        public bool ShowProfileImagesInSearchAutoComplete { get; set; }

        public int PeopleSearchTermMinimumLength { get; set; }

        public int PeopleSearchAutoCompleteNumberOfPeople { get; set; }

        public bool PeopleSearchAutoCompleteEnabled { get; set; }

        public int CustomerAlbumPictureThumbnailWidth { get; set; }

        public int MaximumMainAlbumPictures { get; set; }

    }
}