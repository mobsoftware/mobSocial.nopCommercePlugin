using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mob.Core
{
    public static class LicensingService
    {


        public static bool ValidateDomain()
        {

            var domainName = HttpContext.Current.Request.Url.Host;
            Assembly callingAssembly = Assembly.GetCallingAssembly();

            string licensePath = HttpContext.Current.Server.MapPath("~") + "\\" + callingAssembly.GetName().Name + ".license.lcs";

            string encryptedDomainName =  File.ReadAllText(licensePath);

            var encryptor = new SimpleEncryptor();

            string licensedDomain = encryptor.DecryptString(encryptedDomainName);

            if (string.IsNullOrEmpty(licensedDomain))
                return false;

            if (licensedDomain.Trim().Equals(domainName))
                return true;

            return false;

        }



//        public static bool ValidateDomain()
//        {
//
//            var domainName = HttpContext.Current.Request.Url.Host;
//            Assembly callingAssembly = Assembly.GetCallingAssembly();
//
//            string licenseResourceName = callingAssembly.FindFirstResourceName("license.lcs");
//
//            var embeddedDomainName = callingAssembly.ReadTextFileToEnd(licenseResourceName);
//
//            if (string.IsNullOrEmpty(embeddedDomainName))
//                return false;
//
//            if (embeddedDomainName.Trim().Equals(domainName))
//                return true;
//
//            return false;
//
//
//        }


       



    }
}
