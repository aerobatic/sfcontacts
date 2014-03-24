define(['angular', 'aerobatic'], function(angular, aerobatic) {
  var module = angular.module('aerobatic', []);

  module.factory('aerobatic', [function() {
    return aerobatic;
  }]);

  module.directive('assetUrl', function (aerobatic) {
    'use strict';

    return {
      priority: 99, // it needs to run after the attributes are interpolated
      restrict: 'A',
      link: function(scope, element, attr) {
        return aerobatic.assetUrl(attr.assetUrl)
        // Write a new href attribute to the element
      }
    };
  }); 
});