using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IMobSecurityService
    {
        string GetSavedEncryptionKey();

        string GetSavedSalt();

        string Encrypt(string PlainText, string Key, string Salt);

        string Decrypt(string CipherText, string Key, string Salt);
    }
}
