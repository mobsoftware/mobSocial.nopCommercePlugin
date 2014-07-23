using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Core.Data;
using System.Linq;
using Nop.Core;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Generic base service to standardize Service APIs
    /// </summary>
    public abstract class BaseService<T, P> where T : BaseEntity where P : BaseEntity
    {

        private readonly IRepository<T> _repository;
        private readonly IRepository<P> _pictureRepository;


        protected IRepository<T> Repository { get { return _repository; } }
        protected IRepository<P> PictureRepository { get { return _pictureRepository; } }

        public BaseService(IRepository<T> repository)
        {
            _repository = repository;
            _pictureRepository = null;
        }

        public BaseService(IRepository<T> repository, IRepository<P> pictureRepository)
        {
            _repository = repository;
            _pictureRepository = pictureRepository;
        }

        #region Main Entity Operations

        public void Insert(T entity)
        {
            _repository.Insert(entity);
        }
        public void Update(T entity)
        {
            _repository.Update(entity);
        }
        public void Delete(T entity)
        {
            _repository.Delete(entity);
        }
        public T GetById(int id)
        {
            return _repository.GetById(id);
        }
        public List<T> GetAll()
        {
            return _repository.Table.ToList();
        }
        public abstract List<T> GetAll(string term, int count);

        #endregion
        

        #region Entity Pictures

        public void InsertPicture(P entity)
        {
            _pictureRepository.Insert(entity);
        }
        public void UpdatePicture(P entity)
        {
            _pictureRepository.Insert(entity);
        }
        public void DeletePicture(P entity)
        {
            _pictureRepository.Insert(entity);
        }
        /// <summary>
        /// Gets the Entity Picture record for the given id.
        /// </summary>
        /// <param name="id">Id of the entitypicture record.</param>
        public P GetPictureById(int id)
        {
           return _pictureRepository.GetById(id);
        }
        /// <summary>
        /// Gets all pictures for the specified entity
        /// </summary>
        /// <returns></returns>
        public abstract List<P> GetAllPictures(int entityId);

        #endregion


       
        


        
       

    }

}
