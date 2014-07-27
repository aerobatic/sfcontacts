// http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html

describe("Salesforce", function() {
  var httpBackend, salesforce;

  var expectedHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Authorization': 'OAuth @@user.accessToken@@',
    Accept: 'application/json'
  };

  // Inject mocks for any other services that the
  // Salesforce service depends on.
  beforeEach(module('services', function($provide) {
    $provide.value('aerobatic', {
      user: {
        instanceUrl: "https://na17.salesforce.com"
      }
    });
  }));

  beforeEach(inject(function($httpBackend, Salesforce) {
    // Set up the mock http service responses
    httpBackend = $httpBackend;
    salesforce = Salesforce;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('makes GET request to fetch contacts', function() {
    httpBackend.expectGET(/^\/proxy/, _.omit(expectedHeaders, 'Content-Type')).respond({ records: sampleContacts});

    var result;
    salesforce.loadContacts().then(function(data) {
      result = data;
    });

    httpBackend.flush();
    expect(result).toEqual({records: sampleContacts});
  });

  it('makes POST request to create a contact', function() {
    var contact = {
      FirstName: 'Chuck',
      LastName: 'Yeager'
    };

    httpBackend.expectPOST(/^\/proxy/, JSON.stringify(contact), expectedHeaders).respond({ id: '5'});

    salesforce.createContact(contact);
    httpBackend.flush();
    expect(contact.Id).toEqual('5');
  });

  it('makes PATCH request to update a contact', function() {
    var contact = {
      Id: '5',
      FirstName: 'Chuck',
      LastName: 'Yeager',
      Title: 'Test Pilot'
    };

    var urlRe = new RegExp(encodeURIComponent("/sobjects/Contact/5"));
    httpBackend.expectPATCH(urlRe, JSON.stringify(_.omit(contact, "Id")), expectedHeaders).respond(function() {
      return [204];
    });

    salesforce.updateContact(contact);
    httpBackend.flush();
  });
});
