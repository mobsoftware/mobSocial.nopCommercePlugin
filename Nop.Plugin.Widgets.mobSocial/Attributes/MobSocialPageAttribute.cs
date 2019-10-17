// #region Author Information
// // MobSocialPageAttribute.cs
// // 
// // (c) Apexol Technologies. All Rights Reserved.
// // 
// #endregion

using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Nop.Plugin.Widgets.MobSocial.Constants;

namespace Nop.Plugin.Widgets.MobSocial.Attributes
{
    /// <summary>
    /// Specifies that a particular action causes a mobsocial page to open
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class MobSocialPageAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            MobSocialConstant.IsMobSocialPage = true;
            base.OnActionExecuting(filterContext);
        }
    }
}