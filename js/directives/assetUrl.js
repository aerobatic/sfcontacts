

define(['aerobatic', 'angular'], function(aerobatic, angular) {

  var module = angular.module('seedDirectives', ['aerobatic']);

  module.directive('assetUrl', function () {
    'use strict';

    return function (scope, elem, attrs) {
      console.log(attr);
    };

    // return {
    //   priority: 99, // it needs to run after the attributes are interpolated
    //   restrict: 'A',
    //   link: function(scope, element, attr) {
    //     console.log(attr);
    //     // Write a new href attribute to the element

    //   }
    // };
  }); 
});