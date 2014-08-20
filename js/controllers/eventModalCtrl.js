
angular.module('controllers').controller('EventModalCtrl', function(
    $scope, $log, $modalInstance, aerobatic, hackEvent) {

  // Clone the contact so that any edits are not reflected in the
  // main page.
  $scope.hackEvent = (hackEvent ? _.clone(hackEvent) : {});
  $scope.modalInstance = $modalInstance;

  $scope.openDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dateOpened = true;
  };

  $scope.saveEvent = function(evnt) {
    $log.debug("Saving event");
    delete $scope.errors;

    $scope.hackEvent.organizer = aerobatic.user.username;
    $scope.hackEvent.dateCreated = new Date();
    $modalInstance.close($scope.hackEvent);

    evnt.preventDefault();
  };
});
