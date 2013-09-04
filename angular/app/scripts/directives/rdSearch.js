'use strict';

angular.module('ladioApp')
  .directive('rdSearch', function () {
    return {
      templateUrl: 'scripts/directives/rdSearch.html',
      restrict: 'A',
      replace: true,
      transclude: 'element',
      compile: function(cElement, attr, transcludeFn) {
        return function(scope, element) {
          transcludeFn(scope, function(clone) {
            var templInput = element.find('input');
            templInput.replaceWith(clone);
          });
          var inputElem = element.find('input');
          var buttonElem = element.find('button');
          buttonElem.bind('click', function() {
            inputElem.val('');
          });
        };
      }
    };
  });
