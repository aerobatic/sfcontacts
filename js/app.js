/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular.module('services', []).value('aerobatic', window.__config__);

angular.module('controllers', ['services']);
angular.module('directives', ['services']);
angular.module('sfContacts', ['ui.bootstrap', 'services', 'controllers', 'directives']);

angular.module('sfContacts').config(function ($locationProvider, $sceDelegateProvider, $httpProvider) {
  // Tell angular to trust loading template from the Aerobatic CDN.
  // In simulator mode cdnHost will be localhost
  $sceDelegateProvider.resourceUrlWhitelist([
    // Need the special 'self' keyword so the angular-ui templates are trusted
    'self',
    'https://' + __config__.cdnHost + '/**'
  ]);

  // Register the custom $http interceptor
  $httpProvider.interceptors.push(function($q, $window, aerobatic) {
    return {
      responseError: function(rejection) {
        var status = rejection.status;
        // If the status is 401 Unauthorized, automatically logout
        if (status == 401) {
          $window.location = aerobatic.logoutUrl + (logoutUrl.indexOf('?') == -1 ? '?' : '&') + 'error=expired';
          return;
        }

        return $q.reject(rejection);
      }
    };
  });
});
