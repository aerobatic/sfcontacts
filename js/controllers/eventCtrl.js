
angular.module('controllers').controller('EventCtrl', function($scope, $log, $routeParams, $modal, $firebase, aerobatic) {
  'use strict';

  $scope.aerobatic = aerobatic;
  var ref = new Firebase(aerobatic.settings.FIREBASE_URL + '/events/' + $routeParams.eventId);
  var sync = $firebase(ref);
  $scope.hackEvent = sync.$asObject();

  var projectsRef = new Firebase(aerobatic.settings.FIREBASE_URL + '/projects/' + $routeParams.eventId);
  var projectsSync = $firebase(projectsRef);
  $scope.projects = projectsSync.$asArray();

  $scope.isStarred = function(project) {
    return _.isObject(project.stars) &&
      _.any(_.values(project.stars), {user: aerobatic.user.username});
  };

  $scope.starCount = function(project) {
    if (!project || !_.isObject(project.stars))
      return 0;

    return _.keys(project.stars).length;
  };

  $scope.starProject = function(project) {
    // Find the $id of the first star for the current user.
    var existingStarId = null;
    if (_.isObject(project.stars)) {
      existingStarId = _.find(_.keys(project.stars), function(key) {
        return project.stars[key].user == aerobatic.user.username;
      });
    }

    // TODO: There is probably a cleaner way to do this.
    var ref = new Firebase(aerobatic.settings.FIREBASE_URL + '/projects/' + $routeParams.eventId + '/' + project.$id + '/stars');
    var sync = $firebase(ref);

    if (existingStarId)
      sync.$remove(existingStarId);
    else
      sync.$push({user: aerobatic.user.username});
  };

  $scope.usersWhoStarred = function(project) {
    if (!project || !_.isObject(project.stars)) return '';

    return _.map(_.values(project.stars), function(star) {
      return star.user;
    }).join(', ');
  };

  $scope.openProjectModal = function(project) {
    var modalInstance = $modal.open({
      backdrop: 'static',
      templateUrl: aerobatic.cdnUrl + '/partials/projectModal.html',
      controller: 'ProjectModalCtrl',
      resolve: {
        project: function () {
          return project;
        }
      }
    });

    modalInstance.result.then(function(project) {
      // Turn the hashtag string into an array

      $scope.projects.$add(project);
    });
  };
});
