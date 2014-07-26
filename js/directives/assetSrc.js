
// Simple directive which dynamically sets the src attribute of the target
// by pre-pending the aerobatic cdnUrl.
angular.module('directives').directive('assetSrc', function(aerobatic) {
  return function(scope, element, attrs) {
    element.attr('src', aerobatic.cdnUrl + '/' + attrs.assetSrc);
  };
});
