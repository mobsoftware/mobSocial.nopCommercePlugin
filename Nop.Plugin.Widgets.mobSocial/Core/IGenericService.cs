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
    public interface IGenericService<T> where T : BaseEntity
    {

        void Insert(T entity);
        void Delete(T entity);
        void Update(T entity);

        T GetById(int id);
        
        List<T> GetAll();
        

    }

}
