using System;
using System.Linq;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Seo;
using Nop.Core.Events;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Events;
using Nop.Services.Seo;
using Nop.Web.Framework.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Core
{

    public partial class CustomerUpdatedEventHandler : IConsumer<EntityUpdated<Customer>>
    {
        private readonly IUrlRecordService _urlRecordService;
        private readonly ICustomerService _customerService;
        private readonly IRepository<UrlRecord> _urlRecordRepository;

        public CustomerUpdatedEventHandler(IUrlRecordService urlRecordService, ICustomerService customerService, IRepository<UrlRecord> urlRecordRepository)
        {
            _urlRecordService = urlRecordService;
            _customerService = customerService;
            _urlRecordRepository = urlRecordRepository;
        }

        public void HandleEvent(EntityUpdated<Customer> eventMessage)
        {
            Customer customer = eventMessage.Entity;

            string firstName = customer.GetAttribute<string>(SystemCustomerAttributeNames.FirstName);
            string lastName = customer.GetAttribute<string>(SystemCustomerAttributeNames.LastName);

            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName))
                return;


            // todo: pull line below out into a service method
            bool customerAlreadyHasCustomUrl = _urlRecordRepository.Table
                               .Any(u => u.EntityId == customer.Id &&
                                               u.EntityName == "Customer");

            if (customerAlreadyHasCustomUrl)
                return;



            var customersWithSameName = _customerService.GetAllCustomers(default(DateTime?), default(DateTime?),
                          0, 0, null, null, null, firstName, lastName);

            int numberSameNameWithSlugs = customersWithSameName.Count(c => _urlRecordRepository.Table
                             .Any(urlRecord => urlRecord.EntityId == c.Id && urlRecord.EntityName == "Customer"));


            string slug = firstName + "-" + lastName +
               ((numberSameNameWithSlugs > 0)
                              ? "-" + (numberSameNameWithSlugs + 1).ToString()
                              : string.Empty);

            
            _urlRecordService.InsertUrlRecord(new UrlRecord()
            {
                EntityId = customer.Id,
                EntityName = "Customer",
                LanguageId = 0,
                Slug = slug.ToLowerInvariant(),
                IsActive = true
            });
            


        }
    }
    

    
}