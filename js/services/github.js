angular.module('services').factory('GitHub', function($http, $q, $log, aerobatic) {
  return {
    getUser: function(username) {
      return $http({
        method: 'get',
        cache: true,
        url: 'https://api.github.com/users/' + encodeURIComponent(username),
      });
    }
  };
});
