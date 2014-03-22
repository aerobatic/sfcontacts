
define(['angular'], function(angular){
  function DetailCtrl($scope, $routeParams, Thing) {
    'use strict';

    var thingId = $routeParams.id;
    $scope.thing = Thing.find(thingId);
  };

  DetailCtrl.$inject = ['$scope', '$routeParams', 'Thing'];
  return DetailCtrl;
});