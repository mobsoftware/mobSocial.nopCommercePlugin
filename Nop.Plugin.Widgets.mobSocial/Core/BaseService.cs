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
    public abstract class BaseService<T> where T : BaseEntity
    {

        private readonly IRepository<T> _repository;

        protected IRepository<T> Repository { get; set; }

        public BaseService(IRepository<T> repository)
        {
            _repository = repository;
        }

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

        public List<T> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }
       

    }

}
