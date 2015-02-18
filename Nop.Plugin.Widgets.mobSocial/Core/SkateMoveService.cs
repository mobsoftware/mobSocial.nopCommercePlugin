using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Catalog;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public class SkateMoveService : ISkateMoveService
    {


        #region Constants

        private const string SKATE_MOVE_KEY = "productCarouselProducts";

        #endregion

        #region Fields

        /// <summary>
        /// Object context
        /// </summary>
        private ICacheManager _cacheManager;
        private readonly IRepository<SkateMove> _skateMoveRepository;
        private readonly IRepository<CustomerSkateMove> _customerSkateMoveRepository;

        #endregion

        #region Properties

        /// <summary>
        /// Gets a value indicating whether cache is enabled
        /// </summary>
        public bool CacheEnabled
        {
            

            get
            {
                //ISettingService ser;
                //var setting = ser.GetSettingByKey("Cache.ProductManager.CacheEnabled").Value;

                // IoC.Resolve<ISettingService>().GetSettingValueBoolean("");
                return true;
            }
        }

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="context">Object context</param>
        public SkateMoveService(IProductService productService, IRepository<SkateMove> skateMoveRepository, IRepository<CustomerSkateMove> customerSkateMoveRepository, ICacheManager cacheManager)
        {

            _cacheManager = cacheManager;
            _skateMoveRepository = skateMoveRepository;
            _customerSkateMoveRepository = customerSkateMoveRepository;
        }

        #endregion




        #region Methods


        /// <summary>
        /// Gets all the ProductCarousel records
        /// </summary>
        /// <returns>List of Products to show in carousel</returns>
        public List<SkateMove> GetAll()
        {
            return _skateMoveRepository.Table.ToList();
        }
        

        public List<CustomerSkateMove> GetCustomerSkateMoves(int customerId)
        {
            return _customerSkateMoveRepository.Table.Where(x => x.CustomerId == customerId).ToList();
        }

       


       





        #endregion





    }
}

    

