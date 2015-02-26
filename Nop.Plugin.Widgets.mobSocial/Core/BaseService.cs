using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Core.Data;
using System.Linq;
using Nop.Core;
using System;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;
using Mob.Core;
using Nop.Core.Domain.Media;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Generic base service to standardize Service APIs
    /// </summary>
    public abstract class BaseService<T, P> : IBaseService<T,P> where T : BaseEntity where P : BaseEntity
    {

        private readonly IRepository<T> _repository;
        private readonly IRepository<P> _pictureRepository;
        private readonly IWorkContext _workContext;
        private readonly IUrlRecordService _urlRecordService;


        protected IRepository<T> Repository { get { return _repository; } }
        protected IRepository<P> PictureRepository { get { return _pictureRepository; } }
        protected IWorkContext WorkContext { get { return _workContext; } }

        public BaseService(IRepository<T> repository)
        {
            _repository = repository;
            _pictureRepository = null;
        }

        public BaseService(IRepository<T> repository, IWorkContext workContext)
        {
            _repository = repository;
            _pictureRepository = null;
            _workContext = workContext;
        }

        public BaseService(IRepository<T> repository, IWorkContext workContext, IUrlRecordService urlRecordService)
        {
            _repository = repository;
            _pictureRepository = null;
            _workContext = workContext;
            _urlRecordService = urlRecordService;
        }

        public BaseService(IRepository<T> repository, IRepository<P> pictureRepository, IWorkContext workContext, IUrlRecordService urlRecordService)
        {
            _repository = repository;
            _pictureRepository = pictureRepository;
            _workContext = workContext;
            _urlRecordService = urlRecordService;
        }

        #region Main Entity Operations

        public void Insert(T entity)
        {
            _repository.Insert(entity);

            if(entity is ISlugSupported && entity is INameSupported)
                InsertUrlRecord(entity);

        }

        public void Update(T entity)
        {

            _repository.Update(entity);

            if (entity is ISlugSupported && entity is INameSupported)
            {
                var currentSlug = _urlRecordService.GetActiveSlug(entity.Id, typeof(T).Name, _workContext.WorkingLanguage.Id);
                
                if(!string.IsNullOrEmpty(currentSlug))
                    UpdateUrlRecord(entity, currentSlug);
                else
                    InsertUrlRecord(entity);
            }


        }
        public void Delete(T entity)
        {
            if (entity is ISlugSupported && entity is INameSupported)
            {
                // TODO: Need Nop UrlRecordService.GetByEntityId(entityId, entityName) method
                var currentSlug = _urlRecordService.GetActiveSlug(entity.Id, typeof(T).Name, _workContext.WorkingLanguage.Id);
                if (!string.IsNullOrEmpty(currentSlug))
                {
                    var urlRecord = _urlRecordService.GetBySlug(currentSlug);
                    _urlRecordService.DeleteUrlRecord(urlRecord);
                }
            }  

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
            _pictureRepository.Update(entity);
        }
        public void DeletePicture(P entity)
        {
            _pictureRepository.Delete(entity);
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

        /// <summary>
        /// Gets the first entity picture for the specified entity from EntityPicture table
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public abstract P GetFirstEntityPicture(int entityId);

        /// <summary>
        /// Gets the first picture for the specified entity
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public abstract Picture GetFirstPicture(int entityId);

        #endregion






        #region Helper Methods

        private void InsertUrlRecord(T entity)
        {
            var namedEntity = (INameSupported)entity;
            var urlRecord = new UrlRecord()
            {
                EntityId = entity.Id,
                EntityName = typeof(T).Name,
                IsActive = true,
                LanguageId = _workContext.WorkingLanguage.Id,
                Slug = Nop.Services.Seo.SeoExtensions.GetSeName(namedEntity.Name, true, false)
            };

            _urlRecordService.InsertUrlRecord(urlRecord);
        }

        private void UpdateUrlRecord(T entity, string currentSlug)
        {
            var urlRecord = _urlRecordService.GetBySlug(currentSlug);
            var namedEntity = (INameSupported)entity;
            var newSlug = Nop.Services.Seo.SeoExtensions.GetSeName(namedEntity.Name, true, false);

            urlRecord.EntityName = typeof(T).Name;
            urlRecord.LanguageId = _workContext.WorkingLanguage.Id;
            urlRecord.Slug = newSlug;

            _urlRecordService.UpdateUrlRecord(urlRecord);
        }
        #endregion




        
    }

}
