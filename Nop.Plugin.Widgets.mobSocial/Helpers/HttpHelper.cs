using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Helpers
{
    public class HttpHelper
    {
        public enum RequestMethod
        {
            GET, POST
        }
        
        public static byte[] ExecuteGET(string url)
        {
            return ExecuteUrl(url, RequestMethod.GET);
        }
        public static byte[] ExecutePOST(string url, NameValueCollection Parameters = null)
        {
            return ExecuteUrl(url, RequestMethod.POST, Parameters);
        }        
        public static byte[] ExecuteUrl(string url, RequestMethod method = RequestMethod.POST, NameValueCollection Parameters = null)
        {

            using (var webClient = new WebClient())
            {
                try
                {
                    
                    if (RequestMethod.POST == method)
                    {
                        var resBytes = webClient.UploadValues(url, Parameters);
                        return resBytes;
                    }
                    else
                    {
                        var resBytes = webClient.DownloadData(url);
                        return resBytes;
                    }
                    
                }
                catch (Exception e)
                {

                    return null;
                }
            }          
        }

        public static void DownloadRemoteImageFile(string Url, string OutputImageFile)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            // Check that the remote file was found. The ContentType
            // check is performed since a request for a non-existent
            // image file might be redirected to a 404-page, which would
            // yield the StatusCode "OK", even though the image was not
            // found.
            if ((response.StatusCode == HttpStatusCode.OK ||
                response.StatusCode == HttpStatusCode.Moved ||
                response.StatusCode == HttpStatusCode.Redirect) &&
                response.ContentType.StartsWith("image", StringComparison.OrdinalIgnoreCase))
            {

                // if the remote file was found, download it
                using (Stream inputStream = response.GetResponseStream())
                using (Stream outputStream = File.OpenWrite(OutputImageFile))
                {
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    do
                    {
                        bytesRead = inputStream.Read(buffer, 0, buffer.Length);
                        outputStream.Write(buffer, 0, bytesRead);
                    } while (bytesRead != 0);
                }
            }
        }
    }
}