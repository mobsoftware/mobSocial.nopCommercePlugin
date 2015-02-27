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
    public interface IBusinessPageService : IBaseService<BusinessPage, BusinessPagePicture>
    {
        List<BusinessPage> Search(string nameKeyword, string city, int? stateProvinceId, int? countryId);
    }

}
