// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html#testing-controllers
define(['angular', 'angular-mocks', 'asset!js/controllers/detailCtrl'], function (angular, mocks, detailCtrl) {

	describe("detailCtrl", function() {
		var scope, ctrl, thinMock;
		beforeEach(function() {
      thingMock = {
        find: function(id) {
          return {id: id};
        }
      };
		});

		it('should have a properly working DetailCtrl', function() {
	    mocks.inject(function($rootScope, $controller) {
	      scope = $rootScope.$new();
	      ctrl = $controller(detailCtrl, {
          $scope: scope,
          $routeParams: {id: 2},
          Thing: thingMock
        });
		  });

	    assert.isDefined(scope.thing);
      assert.equal(scope.thing.id, 2);
	  });
	});
});
