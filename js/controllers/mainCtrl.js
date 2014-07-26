// Inject the Salesforce and Aerobatic services into our controller
angular.module('controllers').controller('MainCtrl', function($scope, $log, $modal, aerobatic, Salesforce) {
  'use strict';

  $scope.aerobatic = aerobatic;

  var contacts;
  $scope.contactsLoading = true;
  $scope.filterText = '';

  Salesforce.loadContacts().success(function(data) {
    $log.info("Salesforce returned " + data.records.length + " contacts");
    $scope.contactsLoading = false;
    contacts = data.records;
    divideIntoRows(contacts);
  }).error(function(data) {
    $scope.contactsLoading = false;
    // TODO: Show an error message in the view
    $log.error(data);
  });

  $scope.$watch('filterText', function(newValue, oldValue) {
    if (newValue === oldValue)
      return;

    $log.info("Filtering on " + newValue);
    var filtered = _.filter(contacts, function(contact) {
      var fieldsToSearch = ['FirstName', 'LastName'];
      newValue = newValue.toLowerCase();

      return _.any(fieldsToSearch, function(field) {
        return _.isString(contact[field]) && contact[field].toLowerCase().indexOf(newValue) !== -1;
      });
    });

    if (filtered.length === 0) {
      $scope.noMatchingContacts = true;
      $scope.contactRows = [];
      return;
    }

    delete $scope.noMatchingContacts;
    divideIntoRows(filtered);
  });

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
      if (contact)
        contacts = _.reject(contacts, {Id: contact.Id});

      // Put the new contact in the first slot which matches
      // how the Salesforce list contacts API works
      contacts.unshift(savedContact);
      divideIntoRows(contacts);
    });
  };

  // Divide our list of contact records into rows of 3 to work well with
  // the Bootstrap grid.
  function divideIntoRows(contactList) {
    var contactRows = [[]];
    for (var i=0; i<contactList.length; i++) {
      if (contactRows[contactRows.length - 1].length === 3)
        contactRows.push([contactList[i]]);
      else
        contactRows[contactRows.length- 1].push(contactList[i]);
    }
    $scope.contactRows = contactRows;
  }
});
