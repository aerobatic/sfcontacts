/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular.module('services', []).value('aerobatic', window.__config__);

angular.module('controllers', ['services']);
//'ui.bootstrap',
angular.module('sfContacts', ['ngRoute', 'services', 'controllers']);


angular.module('sfContacts').config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'http://' + __config__.cdnHost + '/**',
    'https://' + __config__.cdnHost + '/**'
  ]);

  $routeProvider
    .when('/', {
      controller: 'IndexCtrl',
      templateUrl: __config__.cdnUrl + '/partials/index.html'
    })
    .when('/:id', {
      controller: 'DetailCtrl',
      templateUrl: __config__.cdnUrl + '/partials/detail.html'
    })
    .otherwise({redirectTo: '/'});
});


angular.module('sfContacts').run(function($rootScope, $route, $window, $log, aerobatic) {
  $rootScope.logoutUrl = aerobatic.logoutUrl;

  // $rootScope.$on('$locationChangeStart', function(event, next, current) {
  //   if (!aerobatic.user) {
  //
  //   }
  //
  //   $log.info('locationChange to ' + next);
  // });
});
