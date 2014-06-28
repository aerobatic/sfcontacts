
angular.module('controllers').controller('LoginCtrl', function($scope, $location, aerobatic) {
  'use strict';

  $scope.authUrl = aerobatic.authUrl;
});
