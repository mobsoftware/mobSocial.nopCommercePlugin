using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Generic service to standardize Service APIs
    /// </summary>
    public interface IBaseService<T, P> where T : BaseEntity where P : BaseEntity
    {

        void Insert(T entity);
        void Delete(T entity);
        void Update(T entity);
        T GetById(int id);
        List<T> GetAll();
        List<T> GetAll(string term, int count);

        void InsertPicture(P entity);
        void UpdatePicture(P entity);
        void DeletePicture(P entity);

        P GetPictureById(int id);


        List<P> GetAllPictures(int entityId);
        P GetFirstPicture(int entityId);




        

    }

}
