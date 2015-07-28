using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mob.Core
{
    public static class VideoUtility
    {
        //Used from here
        //http://help.encoding.com/knowledge-base/article/correct-mime-types-for-serving-video-files/

        public static string GetContentType(string fileExtension)
        {
            switch (fileExtension)
            {
                case ".flv":
                    return "video/x-flv";
                case ".mp4":
                    return "video/mp4";
                case ".3gp":
                    return "video/3gpp";
                case ".mov":
                    return "video/quicktime";
                case ".avi":
                    return "video/x-msvideo";
                case ".wmv":
                    return "video/x-ms-wmv";
                default:
                    return string.Empty;
            }
        }
    }
}
