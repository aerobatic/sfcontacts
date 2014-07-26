
angular.module('controllers').controller('ContactModalCtrl', function($scope, $log, $modalInstance, aerobatic, Salesforce, contact) {
  // Clone the contact so that any edits are not reflected in the
  // main page.
  $scope.contact = (contact ? _.clone(contact) : {});
  $scope.modalInstance = $modalInstance;

  function errorHandler(err) {
    $scope.contactSaving = false;
    $log.error("Error returned from Salesforce API: " + JSON.stringify(err));

    var errors;
    if (_.isString(err))
      errors = [err];
    else if (_.isArray(err))
      // Grab all the message attributes of each err in the array
      errors = _.map(err, 'message');

    $scope.errors = errors;
  }

  $scope.saveContact = function(evnt) {
    $log.debug("Saving contact");
    delete $scope.errors;
    $scope.contactSaving = true;

    var operation = $scope.contact.Id ?
      Salesforce.updateContact : Salesforce.createContact;

    operation($scope.contact).then(function(contact) {
      $scope.contactSaving = false;
      $log.debug("Contact saved successfully");
      $modalInstance.close(contact);
    }, errorHandler);

    evnt.preventDefault();
  };
});
