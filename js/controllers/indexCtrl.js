
angular.module('controllers').controller('IndexCtrl', function($scope, $location, $http, $log, aerobatic) {
  'use strict';

  $scope.contactsLoading = true;
  $scope.filterText = '';

  var contacts;

  // "https://na17.salesforce.com/services/data/v20.0/sobjects/Contact"
  var soql = "SELECT Name, Title, Phone, Email FROM Contact";
  var url = "https://na17.salesforce.com/services/data/v30.0/query?q=" + encodeURIComponent(soql);

  var config = {
    method: 'GET',
    url: '/proxy?url=' + encodeURIComponent(url),
    headers: {
      'X-Authorization': 'OAuth @@user.accessToken@@'
    }
  };

  $http(config).success(function(data, status, headers, config) {
    $log.info(data);
    $scope.contactsLoading = false;
    contacts = data.records;
    divideIntoRows(contacts);
  }).
  error(function(data, status, headers, config) {
    $scope.contactsLoading = false;
    $log.error(data);
  });

  $scope.$watch('filterText', function(newValue, oldValue) {
    if (newValue === oldValue)
      return;

    $log.info("Filtering on " + newValue);
    var filtered = _.filter(contacts, function(contact) {
      return contact.Name.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
    });

    if (filtered.length === 0) {
      $scope.noMatchingContacts = true;
      $scope.contactRows = [];
      return;
    }

    delete $scope.noMatchingContacts;
    divideIntoRows(filtered);
  });


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
