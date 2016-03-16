using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HtmlAgilityPack;
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
            //to extract meta data, we use htmlagilitypack from http://htmlagilitypack.codeplex.com/
            var htmlDocument = new HtmlWeb().Load(url);

            string title = "", description = "";
            var listImageUrls = new List<string>();

            //first give preference to open graph tags
            var descNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:description']");
            if (descNode != null)
            {
                var desc = descNode.Attributes["content"];
                if (desc != null)
                    description = HttpUtility.HtmlDecode(desc.Value);
            }
            var titleNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:title']");
            if (titleNode != null)
            {
                var t = titleNode.Attributes["content"];
                if (t != null)
                    title = HttpUtility.HtmlDecode(t.Value);
            }

            //if og tags didn't exist or didn't have data, let's try with meta tags for description
            if (descNode == null || string.IsNullOrEmpty(description))
            {
                //no og tag
                descNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@name='description']");
                if (descNode != null)
                {
                    var desc = descNode.Attributes["content"];
                    if (desc != null)
                        description = HttpUtility.HtmlDecode(desc.Value);
                }
            }
            

            //and then for the title
            if (titleNode == null || string.IsNullOrEmpty(title))
            {
                titleNode = htmlDocument.DocumentNode.SelectSingleNode("//title");
                if (titleNode != null)
                {
                    title = HttpUtility.HtmlDecode(titleNode.InnerText);
                }
            }
           

            //the images to show

            //first the og image ofcourse
            var ogImageNode = htmlDocument.DocumentNode.SelectSingleNode("//meta[@property='og:image']");
            var ogImageUrl = string.Empty;
            if (ogImageNode != null)
            {
                var ogImage = ogImageNode.Attributes["content"];
                if (ogImage != null)
                {
                    ogImageUrl = ogImage.Value;
                }

            }
            listImageUrls = htmlDocument.DocumentNode.Descendants("img").Select(x => x.GetAttributeValue("src", null)).Where(s => !string.IsNullOrEmpty(s)).ToList();
            if(!string.IsNullOrEmpty(ogImageUrl))
            //insert og image in the beginning if it's there
                listImageUrls.Insert(0, ogImageUrl);

            var uriParsed = new Uri(url);
            
            return Json(new {
                Success = true,
                Title = title,
                Description = description,
                Images = listImageUrls,
                AbsoluteUrl = uriParsed.AbsoluteUri,
                HostName = uriParsed.Host,
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
