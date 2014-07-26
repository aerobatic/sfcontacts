
angular.module('controllers').controller('LoginCtrl', function($scope, $window, aerobatic) {
  'use strict';

  $scope.aerobatic = aerobatic;
  $scope.sessionTimeout = /error=expired/.test($window.location.href);
});
