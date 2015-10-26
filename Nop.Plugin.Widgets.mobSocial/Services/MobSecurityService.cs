using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class MobSecurityService : IMobSecurityService
    {
        public string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public string Encrypt(string PlainText, string Key)
        {
            if (string.IsNullOrEmpty(PlainText))
                return string.Empty;
            //let's md5 the key itself.
            var md5 = MD5.Create();
            Key = this.GetMd5Hash(md5, Key);

            string cipherText;
            var rijndael = new RijndaelManaged() {
                Key = Encoding.UTF8.GetBytes(Key),
                Mode = CipherMode.CBC,
                BlockSize = 128,
            };
            ICryptoTransform encryptor = rijndael.CreateEncryptor(rijndael.Key, rijndael.IV);

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {
                    using (var streamWriter = new StreamWriter(cryptoStream))
                    {
                        streamWriter.Write(PlainText);
                        streamWriter.Flush();
                    }
                    cipherText = Convert.ToBase64String(memoryStream.ToArray());
                }
            }
            return cipherText;
        }

        public string Decrypt(string CipherText, string Key)
        {
            if (string.IsNullOrEmpty(CipherText))
                return string.Empty;

            //let's md5 the key itself.
            var md5 = MD5.Create();
            Key = this.GetMd5Hash(md5, Key);

            string plainText;
            byte[] cipherArray = Convert.FromBase64String(CipherText);
            var rijndael = new RijndaelManaged() {
                Key = Encoding.UTF8.GetBytes(Key),
                Mode = CipherMode.CBC,
                BlockSize = 128
            };
            ICryptoTransform decryptor = rijndael.CreateDecryptor(rijndael.Key, rijndael.IV);

            using (var memoryStream = new MemoryStream(cipherArray))
            {
                using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                {
                    using (var streamReader = new StreamReader(cryptoStream))
                    {
                        plainText = streamReader.ReadToEnd();
                    }
                }
            }
            return plainText;
        }
    }
}