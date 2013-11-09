using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Mob.Core
{
    public static class AssemblyExtensions
    {

        public static string ReadTextFileToEnd(this Assembly assembly, string resourceName)
        {
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }

            }

        }


        public static string FindFirstResourceName(this Assembly assembly, string fileName)
        {
            return assembly.GetManifestResourceNames().FirstOrDefault(x => x.ToLower().Contains(fileName));
        }


    }
}
