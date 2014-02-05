using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Mob.Core
{
    public static class FileUtility
    {

        public static void CopyAndAddNumberIfExists(string sourceFilePath, string destinationFolder)
        {

            string sourceFileName = Path.GetFileName(sourceFilePath);
            string destinationFilePath = FilePathAddNumberIfExists(sourceFileName, destinationFolder);

            File.Copy(sourceFilePath, destinationFilePath); 
            
        }

        public static void MoveAndAddNumberIfExists(string sourceFilePath, string destinationFolder)
        {

            string sourceFileName = Path.GetFileName(sourceFilePath);
            string destinationFilePath = FilePathAddNumberIfExists(sourceFileName, destinationFolder);

            File.Move(sourceFilePath, destinationFilePath);

        }



        /// <summary>
        /// Gets a new file path if already exists adding a number to the end of the filename.
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFolder"></param>
        /// <returns></returns>
        public static string FilePathAddNumberIfExists(string sourceFileName, string destinationFolder)
        {

            string sourceFile = Path.GetFileNameWithoutExtension(sourceFileName);
            string sourceExt = Path.GetExtension(sourceFileName);

            string resultFilePath = Path.Combine(destinationFolder, string.Format("{0}{1}", sourceFile, sourceExt));

            int num = 1;
            while (File.Exists(resultFilePath))
            {
                resultFilePath = Path.Combine(destinationFolder, string.Format("{0}-{1}{2}", sourceFile, num, sourceExt));
                num++;
            }

            return resultFilePath;

        }







    }


}
