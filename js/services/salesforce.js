
angular.module('services').factory('Salesforce', function($http, $q, $log, aerobatic) {
  var salesforce = {};
  var apiEndpoint = aerobatic.user.instanceUrl + "/services/data/v30.0";

  function buildHttpConfig(url, options) {
    var config = _.defaults(options || {}, {
      method: 'GET',
      headers: {}
    });

    if (_.contains(['POST', 'PATCH'], config.method))
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';

    // The token user.accessToken will get replaced by Aerobatic
    // with the actual access_token that came back in the
    // OAuth callback. Aerobatic intentionally keeps this
    // token securely stored on the server and avoids passing
    // it over the network.
    config.headers['X-Authorization'] = 'OAuth @@user.accessToken@@';

    config.headers.Accept = 'application/json';

    // Wrap the url in a call to the API proxy
    config.url = '/proxy?url=' + encodeURIComponent(url);

    return config;
  }

  salesforce.loadContacts = function() {
    // "https://na17.salesforce.com/services/data/v20.0/sobjects/Contact"
    var soql = "SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact";
    var url = apiEndpoint + "/query?q=" + encodeURIComponent(soql);

    var deferred = $q.defer();
    $http(buildHttpConfig(url)).success(function(data) {
      deferred.resolve(data);
    }).error(function(err, status) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  salesforce.createContact = function(contact) {
    var url = apiEndpoint + '/sobjects/Contact/';

    var deferred = $q.defer();
    $http(buildHttpConfig(url, {method: 'POST', data: contact})).success(function(data) {
      // Assign the new Id to the contact
      contact.Id = data.id;
      deferred.resolve(contact);
    }).error(function(err, status) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  salesforce.updateContact = function(contact) {
    var url = apiEndpoint + '/sobjects/Contact/' + contact.Id;

    var deferred = $q.defer();
    $http(buildHttpConfig(url, {method: 'PATCH', data: _.omit(contact, 'Id')})).success(function(data) {
      deferred.resolve(contact);
    }).error(function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  return salesforce;
});
