using System;
using Nop.Core;
using Nop.Core.Infrastructure;
using Nop.Services.Localization;
using Nop.Services.Seo;

/*using Nop.Core.Domain.Catalog;
using Nop.Services.Catalog;*/

namespace Nop.Plugin.Widgets.MobSocial.Extensions
{
    public static class SeoExtensions
    {
        /// <summary>
        ///  Get search engine name
        /// </summary>
        /// <typeparam name="T">Entity type</typeparam>
        /// <param name="entity">Entity</param>
        /// <param name="languageId">Language identifier</param>
        /// <param name="returnDefaultValue">A value indicating whether to return default value (if language specified one is not found)</param>
        /// <param name="ensureTwoPublishedLanguages">A value indicating whether to ensure that we have at least two published languages; otherwise, load only default value</param>
        /// <returns>Search engine name</returns>
        public static string GetSeName<T>(this T entity, int languageId, bool returnDefaultValue = true,
            bool ensureTwoPublishedLanguages = true)
            where T : BaseEntity
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            string result = string.Empty;
            string entityName = typeof(T).Name;

            var urlRecordService = EngineContext.Current.Resolve<IUrlRecordService>();
            if (languageId > 0)
            {
                //ensure that we have at least two published languages
                bool loadLocalizedValue = true;
                if (ensureTwoPublishedLanguages)
                {
                    var lService = EngineContext.Current.Resolve<ILanguageService>();
                    var totalPublishedLanguages = lService.GetAllLanguages(false).Count;
                    loadLocalizedValue = totalPublishedLanguages >= 2;
                }
                //localized value
                if (loadLocalizedValue)
                {
                    result = urlRecordService.GetActiveSlug(entity.Id, entityName, languageId);
                }
            }
            //set default value if required
            if (String.IsNullOrEmpty(result) && returnDefaultValue)
            {
                result = urlRecordService.GetActiveSlug(entity.Id, entityName, 0);
            }

            return result;
        }
    }
}
