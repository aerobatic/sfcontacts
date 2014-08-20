/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular.module('services', []).factory('aerobatic', function($window) {
  return $window.__config__;
});

angular.module('controllers', ['services']);
angular.module('directives', ['services']);
<<<<<<< HEAD
angular.module('whowantstohack', ['ngRoute', 'ui.bootstrap', 'firebase', 'services', 'controllers', 'directives']);

angular.module('whowantstohack').config(function ($locationProvider, $sceDelegateProvider, $routeProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
      templateUrl: window.__config__.cdnUrl + '/partials/home.html',
      controller: 'MainCtrl'
    })
    .when('/events/:eventId', {
      templateUrl: window.__config__.cdnUrl + '/partials/event.html',
      controller: 'EventCtrl'
    })
    .otherwise({ redirectTo: '/' });
=======
angular.module('sfContacts', ['ui.bootstrap', 'services', 'controllers', 'directives']);
>>>>>>> parent of 6279ea3... Initial commit

angular.module('sfContacts').config(function ($locationProvider, $sceDelegateProvider, $httpProvider) {
  // Tell angular to trust loading template from the Aerobatic CDN.
  // In simulator mode cdnHost will be localhost

  $sceDelegateProvider.resourceUrlWhitelist([
    // Need the special 'self' keyword so the angular-ui templates are trusted
    'self',
    'https://' + window.__config__.cdnHost + '/**'
  ]);

  // Register the custom $http interceptor
  $httpProvider.interceptors.push(function($q, $window, aerobatic) {
    return {
      responseError: function(rejection) {
        var status = rejection.status;
        // If the status is 401 Unauthorized, automatically logout
        if (status == 401) {
          $window.location = aerobatic.logoutUrl + (aerobatic.logoutUrl.indexOf('?') == -1 ? '?' : '&') + 'error=expired';
          return;
        }

        return $q.reject(rejection);
      }
    };
  });
});
