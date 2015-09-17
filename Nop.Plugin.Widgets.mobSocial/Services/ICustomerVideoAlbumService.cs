using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface ICustomerVideoAlbumService
    {

        CustomerVideoAlbum GetCustomerMainVideoAlbum(int customerId);
        CustomerVideoAlbum GetCustomerVideoAlbumById(int videoAlbumId);

        void Insert(CustomerVideo customerVideo);
        void Delete(CustomerVideo customerVideo);

        CustomerVideo GetCustomerVideoById(int customerVideoId);

        CustomerVideoAlbum CreateCustomerMainVideoAlbum(int customerId);


        void Update(CustomerVideo video);
        void AddVideoLike(int customerVideoId, int customerId);
        bool VideoAlreadyLiked(int customerVideoId, int customerId);
        void DeleteCustomerVideo(int customerVideoId);
        // todo: Need to return top 5 featured videos and display in the featured videos block

        CustomerVideo GetFeaturedVideos();
    }

}
