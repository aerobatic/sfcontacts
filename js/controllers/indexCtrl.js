
define(['angular'], function(angular){
  function IndexCtrl($scope, $location, Thing) {
    'use strict';

    $scope.things = Thing.list();

    $scope.loadThing = function(id, $event) {
      $location.path(id);
      $event.preventDefault();
    }
  };

  IndexCtrl.$inject = ['$scope', '$location', 'Thing'];
  return IndexCtrl;
});
