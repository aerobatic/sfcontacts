
angular.module('seedControllers').controller('IndexCtrl', function($scope, $location, Thing) {
  'use strict';

  $scope.things = Thing.list();
});
