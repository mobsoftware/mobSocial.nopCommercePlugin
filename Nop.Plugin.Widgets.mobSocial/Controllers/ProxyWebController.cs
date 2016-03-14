using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Mvc;
using Nop.Web.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class ProxyWebController : BasePublicController
    {
        /// <summary>
        /// Used as a proxy client for fetching url data from another domain. It can be modified to be used for keeping track of spam urls or other audits
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public ActionResult FetchUrl(string url)
        {
            var webClient = new WebClient();
            var data = webClient.DownloadString(url);

            var title = Regex.Match(data, @"\<title\b[^>]*\>\s*(?<Title>[\s\S]*?)\</title\>", RegexOptions.IgnoreCase).Groups["Title"].Value;

            return Json(new {
                Success = true, 
                Title = title}, JsonRequestBehavior.AllowGet);
        }
    }
}
