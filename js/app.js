/**
 * The main app module
 *
 * @type {angular.Module}
 */
require([
  'angular',
  'angular-route',
  'css!css/normalize',
  'css!css/app'
  ], function(angular) {
  'use strict';

  define("angular-seed-app", function(require) {
    // The string arguments to the require function call must be
    // string literals, not JavaScript expressions.
    var views = {
      index: {
        controller: require('asset!js/controllers/indexCtrl'),
        template: require('asset!partials/index')
      },
      detail: {
        controller: require('asset!js/controllers/detailCtrl'),
        template: require('asset!partials/detail')
      }
    };

    // The aerobatic service is a built-in Angular service.
    var app = angular.module('angular-seed', ['ngRoute', 'seedServices', 'aerobatic']);

    app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', views.index)
        .when('/:id', views.detail)
        .otherwise({redirectTo: '/'});
    }]);

    app.run(['$log', function($log) {
      $log.info("Angular run event");
    }]);

    angular.element(document).ready(function() {
      // Append an ng-view to the body to load our partial views into
      angular.element(document.body).append(angular.element(require('asset!partials/layout')));
      angular.bootstrap(document, ['angular-seed']);
    });

    return app;
  });

  // We need to require these after we are assured that angular is available
  // angular-aerobatic is a module built-in to Aerobatic that registers
  // the aerobatic Angular service.
  require(['angular-aerobatic', 'asset!js/services/thing', 'angular-seed-app']);
});
