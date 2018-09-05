using mobSocial.WebApi.Configuration.Database;
using Nop.Core.Data;
using Nop.Core.Infrastructure;

namespace Nop.MobSocial.WebApi
{
    public class WebApiDbSettings : DatabaseSettings
    {
        public override void LoadSettings()
        {
            var settings = EngineContext.Current.Resolve<DataSettings>();
            _connectionString = settings.DataConnectionString;
            _providerName = settings.DataProvider;
        }
    }
}