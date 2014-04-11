define(['angular', 'aerobatic'], function(angular, aerobatic) {
  var module = angular.module('aerobatic', []);

  module.factory('aerobatic', [function() {
    return aerobatic;
  }]);
  
  module.directive('assetSrc', ['aerobatic', function (aerobatic) {
    return {
      priority: 99, // it needs to run after the attributes are interpolated
      restrict: 'A',
      link: function(scope, element, attr) {
        // Set the href attribute to the assetUrl.
        attr.$set("src", aerobatic.assetUrl(attr.assetSrc));
      }
    };
  }]);
});
