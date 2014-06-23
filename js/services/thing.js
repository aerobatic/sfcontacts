
// In reality the thing service would probably use a web API. You might want to bring in the ngResource
// service as a dependency.
// angular.module('services', ['ngResource']).factory('resources', function($resource) {
//  return $resource("http://thing-api/things/:thingId", { thingId: '@thingId'});
// });

angular.module('seedServices').factory('Thing', function() {
  'use strict';

  var things = [
    {
      id: '1',
      name: "Thing1",
      photo: "thing1.jpg"
    },
    {
      id: '2',
      name: "Thing2",
      photo: "thing2.jpg"
    }
  ];

  return {
    list: function() {
      return things;
    },
    find: function(id) {
      for (var i=0; i<things.length; i++) {
        if (things[i].id == id)
          return things[i];
      }
      return null;
    }
  };
});
