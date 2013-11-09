using System.Collections.Generic;
using System.Text;
/*using Nop.Core.Domain.Catalog;
using Nop.Services.Catalog;*/

namespace Mob.Core
{
    public static class CategoryExtensions
    {
        
        /*public static string GetBreadCrumbString(this Category context, ICategoryService categoryService, string breadCrumbDelimiter)
        {
           
            var breadCrumb = new List<Category>();
            var category = context;

            while (category != null && !category.Deleted && category.Published)
            {
                breadCrumb.Add(category);
                category = categoryService.GetCategoryById(category.ParentCategoryId);
            }

            breadCrumb.Reverse();

            var categoryBreadCrumb = new StringBuilder();

            foreach (var cat in breadCrumb)
            {
                categoryBreadCrumb.AppendFormat("{0}{1}", cat.Name, breadCrumbDelimiter);
            }

            if (categoryBreadCrumb.Length <= 0)
                return categoryBreadCrumb.ToString();
            
            categoryBreadCrumb.Length -= breadCrumbDelimiter.Length; // Remove trailing delimiter
            return categoryBreadCrumb.ToString();
            


        }
*/
    }
}
