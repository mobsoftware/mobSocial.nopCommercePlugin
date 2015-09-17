using System.Collections.Generic;
using System.Linq;
using Mob.Core;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Seo;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Generic base service to standardize domain Service APIs
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

        public void LogicalDelete(int id)
        {
            var dbEntity = _repository.GetById(id);
            if (dbEntity is ISoftDeletable)
            {
                var entity = (ISoftDeletable)dbEntity;
                entity.IsDeleted = true;
                _repository.Update((T)entity);
                // Should we delete the slug? 
                // Possibly add property to ISlugSupported to determine if delete slug on logic delete
            }
            else
            {
                throw new ApplicationException("Logical Delete is not supported for the entity: " + typeof(T).Name);
            }


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

        #region SortableOperations
        public void UpdateDisplayOrder(int id, int newDisplayOrder)
        {
            T entity = GetById(id);

            var sortableEntity = (ISortableSupported)entity;

            var oldDisplayOrder = sortableEntity.DisplayOrder;

            var items = _repository.Table
                .Where(x => ((ISortableSupported)x).DisplayOrder >= oldDisplayOrder)
                .ToList();

            sortableEntity.DisplayOrder = newDisplayOrder;

        }
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
