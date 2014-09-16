using System;
using System.Linq;
using System.Web.Mvc;
using Nop.Core;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Common;
using Nop.Services.Catalog;
using Nop.Services.Topics;
using Nop.Services.Seo;
using Nop.Services.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Represents a sitemap generator
    /// </summary>
    public partial class SitemapGenerator : Nop.Services.Seo.SitemapGenerator
    {

        private ICustomerService _customerService;
        private IEventPageService _eventPageService;

        public SitemapGenerator(IStoreContext storeContext,
            ICategoryService categoryService, IProductService productService,
            IManufacturerService manufacturerService, ITopicService topicService,
            CommonSettings commonSettings, IEventPageService eventPageService, 
            ICustomerService customerService
            ) : base(storeContext, categoryService, 
            productService, manufacturerService, topicService, commonSettings)
        {
            _customerService = customerService;
            _eventPageService = eventPageService;
        }


        /// <summary>
        /// Method that is overridden, that handles creation of child urls.
        /// Use the method WriteUrlLocation() within this method.
        /// </summary>
        /// <param name="urlHelper">URL helper</param>
        protected override void GenerateUrlNodes(UrlHelper urlHelper)
        {
            base.GenerateUrlNodes(urlHelper);

            //if (_mobSocialSettings.SitemapIncludeEvents)
            //{
            WriteEventPages(urlHelper);
            WriteProfilePages(urlHelper);
            //}

        }


        private void WriteEventPages(UrlHelper urlHelper)
        {
            var eventPages = _eventPageService.GetAllUpcomingEvents();

            foreach (var eventPage in eventPages)
            {
                var url = urlHelper.RouteUrl("EventPageUrl", new { SeName = eventPage.GetSeName(0) }, "http");
                var updateFrequency = UpdateFrequency.Weekly;
                var updateTime = eventPage.DateUpdated;
                WriteUrlLocation(url, updateFrequency, updateTime);
            }

        }

        private void WriteProfilePages(UrlHelper urlHelper)
        {
            var customers = _customerService.GetAllCustomers();

            var registeredCustomers = customers.Where(x => !x.Deleted && x.Active);

            foreach (var customer in registeredCustomers)
            {
                var url = urlHelper.RouteUrl("CustomerProfileUrl", new { SeName = customer.GetSeName(0) }, "http");

                if (url != null)
                {
                    var updateFrequency = UpdateFrequency.Weekly;
                    var updateTime = customer.LastActivityDateUtc;
                    WriteUrlLocation(url, updateFrequency, updateTime);
                }

            }

        }

        



    }
}
