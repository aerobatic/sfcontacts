angular.module('services', []);
angular.module('controllers', ['services']);
angular.module('directives', ['services']);

angular.module('sfContacts', ['ui.bootstrap', 'Aerobatic', 'services', 'controllers', 'directives']);

angular.module('sfContacts').config(function ($locationProvider, $sceDelegateProvider, $httpProvider) {
  // Tell angular to trust loading template from the Aerobatic CDN.
  // In simulator mode cdnHost will be localhost

  $sceDelegateProvider.resourceUrlWhitelist([
    // Need the special 'self' keyword so the angular-ui templates are trusted
    'self',
    'https://' + window.__config__.cdnHost + '/**'
  ]);
});