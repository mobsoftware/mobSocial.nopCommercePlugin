using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface ICustomerAlbumPictureService
    {

        byte[] CreateThumbnailPicture(byte[] pictureBinary, int maxWidth, string mimeType);
        CustomerAlbum GetCustomerAlbum(int customerId);
        CustomerAlbum GetCustomerAlbumById(int albumId);

        void Insert(CustomerAlbumPicture customerAlbumPicture);
        void Delete(CustomerAlbumPicture customerAlbumPicture);

        CustomerAlbumPicture GetCustomerAlbumPictureById(int customerAlbumPictureId);

        CustomerAlbum CreateCustomerMainAlbum(int customerId);


    }

}
