using Nop.Core;
using Nop.Services.Catalog;
using Nop.Services.Seo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class SitemapGenerator : Nop.Services.Seo.SitemapGenerator, ISitemapGenerator
    {

        public SitemapGenerator(IStoreContext storeContext, ICategoryService categoryService) : base(, )
     

        string ISitemapGenerator.Generate(UrlHelper urlHelper)
        {
            return base.Generate(urlHelper);

            // custom site map
        }

        void ISitemapGenerator.Generate(UrlHelper urlHelper, System.IO.Stream stream)
        {
            base.Generate(urlHelper, stream);
        }
    }
}
