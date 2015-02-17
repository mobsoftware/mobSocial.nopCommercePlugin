using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using Nop.Web.Framework.Localization;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    /// <summary>
    /// Common properties across all social network pages.
    /// </summary>
    public static class ModelUtil
    {
        public static string ContentPathMobSocial { get { return "~/Plugins/Widgets.mobSocial/Content/mobSocial"; } }
        public static string ContentPath { get { return "~/Plugins/Widgets.mobSocial/Content"; } }
    }
}