
angular.module('controllers').controller('ProjectModalCtrl', function(
    $scope, $log, $modalInstance, aerobatic, project) {

  // Clone the contact so that any edits are not reflected in the
  // main page.
  $scope.project = (project ? _.clone(project) : {});
  $scope.modalInstance = $modalInstance;
  $scope.phases = ['Idea', 'Project'];

  $scope.saveProject = function(evnt) {
    $log.debug("Saving project");
    delete $scope.errors;

    if (!$scope.project.$id) {
      $scope.project.originator = aerobatic.user.username;
      $scope.project.submitted = new Date();
    }

    if (!$scope.project.stars)
      $scope.project.stars = 0;

    // Turn the hashtags string into an array for storage
    $scope.project.hashtags = _.map($scope.project.hashtags.split(' '), function(tag) {
      tag = tag.trim();
      if (tag[0] !== '#')
        tag = '#' + tag;
      return tag;
    });

    $modalInstance.close($scope.project);

    evnt.preventDefault();
  };
});
