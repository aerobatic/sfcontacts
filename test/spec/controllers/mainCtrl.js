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
    expect(scope.contactRows.length).toEqual(2);
  });

  it('should divide contacts up into rows', function() {
    var numContacts = 10;
    loadContactsDeferred.resolve({
      records: _.map(_.range(numContacts), function(i) {
        return { Id: i.toString() };
      })
    });

    scope.$root.$digest();

    expect(scope.contactRows.length).toEqual(4);
    expect(_.last(scope.contactRows).length).toEqual(1);
  });

  it('should filter contacts on first name match', function() {
    loadContactsDeferred.resolve({ records: sampleContacts });

    scope.$root.$digest();

    scope.filterText = 'Or';
    scope.filterChange();

    expect(scope.contactRows.length).toEqual(1);
    expect(scope.contactRows[0].length).toEqual(1);
    expect(scope.contactRows[0][0].FirstName).toEqual('Orville');
  });

  it('should filter contacts on first name match', function() {
    loadContactsDeferred.resolve({ records: sampleContacts });

    scope.$root.$digest();

    scope.filterText = 'Wri';
    scope.filterChange();

    expect(scope.contactRows[0].length).toEqual(2);
    expect(_.map(scope.contactRows[0], 'LastName')).toEqual(['Wright', 'Wright']);
  });
});
