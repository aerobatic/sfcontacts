

angular.module('seedControllers').controller('DetailCtrl', function($scope, $routeParams, $window, Thing) {
  'use strict';

  var thingId = $routeParams.id;
  $scope.thing = Thing.find(thingId);

  $scope.thingImage = function(thing) {
    return $window.__config__.cdnUrl + '/images/' + thing.name.toLowerCase() + '.jpeg';
  };
});
