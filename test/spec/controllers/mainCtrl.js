// Spec for the mainCtrl
describe("mainCtrl", function() {
  var scope, ctrl, salesforceMock, loadContactsDeferred;

  beforeEach(module('controllers'));

  beforeEach(inject(function($rootScope, $controller, $q) {
    salesforceMock = {
      loadContacts: function() {
        loadContactsDeferred = $q.defer();
        return loadContactsDeferred.promise;
      }
    };

    spyOn(salesforceMock, 'loadContacts').and.callThrough();

    scope = $rootScope.$new();
    controller = $controller('MainCtrl', {
      $scope: scope,
      $modal: { open: function(){}},
      aerobatic: {},
      Salesforce: salesforceMock
    });
  }));

  it('Salesforce.loadContacts is called', function() {
    loadContactsDeferred.resolve({records: sampleContacts});
    scope.$root.$digest();

    expect(salesforceMock.loadContacts).toHaveBeenCalled();
    expect(scope.contacts.length).toEqual(4);
  });

  it('should filter contacts on first name match', function() {
    loadContactsDeferred.resolve({ records: sampleContacts });

    scope.$root.$digest();

    scope.contactFilterText = 'Or';
    var filteredContacts = _.filter(scope.contacts, scope.contactFilter);
    // expect(JSON.stringify(filteredContacts[0])).toEqual('34');
    expect(filteredContacts.length, 1);
    // expect(filteredContacts[0].FirstName).toEqual('Orville');
  });

  it('should filter contacts on first name match', function() {
    loadContactsDeferred.resolve({ records: sampleContacts });

    scope.$root.$digest();

    scope.contactFilterText = 'Wri';

    var filteredContacts = _.filter(scope.contacts, scope.contactFilter);
    expect(filteredContacts.length, 2);

    // expect(scope.contacts[0].length).toEqual(2);
    // expect(_.map(scope.contacts[0], 'LastName')).toEqual(['Wright', 'Wright']);
  });
});
