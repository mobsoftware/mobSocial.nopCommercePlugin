using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Core
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
