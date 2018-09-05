using System;
using DryIoc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Data.Database;

namespace Nop.MobSocial.WebApi
{
    public class ApiHelper
    {
        public static void InitializeDatabaseAccess()
        {
            var container = mobSocialEngine.ActiveEngine.IocContainer;
            
            //only change the db settings when tables have been succesfully installed, else it may fail due to invalid object name error
            container.Register<IDatabaseSettings>(made: Made.Of(() => new WebApiDbSettings()), reuse: Reuse.Singleton, ifAlreadyRegistered: IfAlreadyRegistered.Replace);

            DatabaseManager.IsMigrationRunning = false;
        }
    }
}