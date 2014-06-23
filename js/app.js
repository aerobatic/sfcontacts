/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular.module('seedServices', []);
angular.module('seedControllers', []);

angular.module('angularSeed', ['ngRoute', 'seedServices', 'seedControllers'])
  .config(function ($routeProvider, $locationProvider) {
    function templateUrl(path) {
      if (__config__.simulator === true)
        return path + '?sim=1&port=' + __config__.simulatorPort;
      else
        return path;
    }

    // Use the bang prefix for Google ajax crawlability
    // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: templateUrl('partials/index.html')
      })
      .when('/:id', {
        controller: 'DetailCtrl',
        templateUrl: templateUrl('partials/detail.html')
      })
      .otherwise({redirectTo: '/'});
  });
