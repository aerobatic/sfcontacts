// Inject the Salesforce and Aerobatic services into our controller
angular.module('controllers').controller('MainCtrl', function($scope, $log, $modal, aerobatic, Salesforce) {
  'use strict';

  $scope.aerobatic = aerobatic;
  $scope.contactsLoading = true;
  $scope.contactFilterText = '';

  Salesforce.loadContacts().then(function(data) {
    $log.info("Salesforce returned " + data.records.length + " contacts");
    $scope.contactsLoading = false;
    $scope.contacts = data.records;
  }, function(data) {
    $scope.contactsLoading = false;
    // TODO: Show an error message in the view
    $log.error(data);
  });

  $scope.contactFilter = function(contact, index) {
    var fieldsToSearch = ['FirstName', 'LastName'];

    return _.any(fieldsToSearch, function(field) {
      return _.isString(contact[field]) && contact[field].toLowerCase().indexOf($scope.contactFilterText) !== -1;
    });
  };

  $scope.openContactModal = function(contact) {
    var modalInstance = $modal.open({
      templateUrl: aerobatic.cdnUrl + '/partials/contactModal.html',
      controller: 'ContactModalCtrl',
      size: 'lg',
      resolve: {
        contact: function () {
          return contact;
        }
      }
    });

    modalInstance.result.then(function(savedContact) {
      // If we are updating an existing contact, remove it from
      // the array.
      var contacts = $scope.contacts;
      contacts = _.reject(contacts, {Id: savedContact.Id});

      // Put the new contact in the first slot which matches
      // how the Salesforce list contacts API works
      contacts.unshift(savedContact);

      $scope.contacts = contacts;
    });
  };
});