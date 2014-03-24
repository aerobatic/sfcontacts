

define(['require', 'angular'], function(require, angular) {

  var module = angular.module('aeroExtensions', []);

  module.directive('aeroAssetUrl', function () {
    'use strict';

    var config = require.config;

    return {
      priority: 99, // it needs to run after the attributes are interpolated
      restrict: 'A',
      link: function(scope, element, attr) {
        // attr.aero-asset-url

        // attr.$set()        
      }
    };
  }); 
});