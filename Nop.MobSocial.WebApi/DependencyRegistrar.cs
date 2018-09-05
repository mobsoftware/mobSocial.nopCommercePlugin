using System;
using Autofac;
using DryIoc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Data.Entity.Users;
using mobSocial.Services.Authentication;
using Nop.Core.Configuration;
using Nop.Core.Infrastructure;
using Nop.Core.Infrastructure.DependencyManagement;
using Nop.Core.Plugins;
using Nop.MobSocial.WebApi.Integration;
using Nop.MobSocial.WebApi.Services;
using mobSocial.Data.Migrations;

namespace Nop.MobSocial.WebApi
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public void Register(ContainerBuilder builder, ITypeFinder typeFinder, NopConfig config)
        {
            var pluginFinderTypes = typeFinder.FindClassesOfType<IPluginFinder>();

            var isInstalled = false;

            var pluginName = "MobSocial.WebApi";
         
            foreach (var pluginFinderType in pluginFinderTypes)
            {
                var pluginFinder = Activator.CreateInstance(pluginFinderType) as IPluginFinder;
                var pluginDescriptor = pluginFinder.GetPluginDescriptorBySystemName(pluginName);

                if (pluginDescriptor != null && pluginDescriptor.Installed)
                {
                    isInstalled = true;
                    break;
                }
            }
            mobSocialEngine.ActiveEngine.Start(true);

            ApiHelper.InitializeDatabaseAccess();

            if (isInstalled)
            {

                var container = mobSocialEngine.ActiveEngine.IocContainer;

                //only change the db settings when tables have been succesfully installed, else it may fail due to invalid object name error
                container.Register<IAuthenticationService, ApiAuthenticationService>(ifAlreadyRegistered: IfAlreadyRegistered.Replace);
                container.Register<IRoleNameProvider, CustomerRoleNameProvider>(ifAlreadyRegistered: IfAlreadyRegistered.Replace);

            }

        }

        public int Order { get; }
    }
}