window.mobSocial.factory('controllerProvider', ['$q', '$rootScope', "$ocLazyLoad", function ($q, $rootScope, $ocLazyLoad) {
   return {
       resolve: function (dependencies) {
           return $ocLazyLoad.load(dependencies);
       },
        getBundlePath : function(bundleName) {
            var formattedBundleName = window.Configuration.pluginPath + "/app/scripts/bundles/" + bundleName + ".bundle.js";
            return formattedBundleName;
        },
        resolveBundle: function (bundleName) {
            var formattedBundleName = this.getBundlePath(bundleName);
            return this.resolve([formattedBundleName]);
        },
        resolveBundles: function (bundleNames) {
            var bundles = [];
            for (var i = 0; i < bundleNames.length; i++)
                bundles.push(this.getBundlePath(bundleNames[i]));
            return this.resolve(bundles);
        }
    };
}]);