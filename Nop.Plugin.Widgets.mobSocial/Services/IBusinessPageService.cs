using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface IBusinessPageService : IBaseService<BusinessPage, BusinessPagePicture>
    {
        List<BusinessPage> Search(string nameKeyword, string city, int? stateProvinceId, int? countryId);
    }

}
