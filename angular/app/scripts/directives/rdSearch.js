'use strict';

angular.module('ladioApp')
  .directive('rdSearch', function () {
    return {
      templateUrl: 'scripts/directives/rdSearch.html',
      restrict: 'E',
      replace: true,
      scope: {
        placeholder: '@placeholder',
        model: '=model',
        change: '=change'
      },
      link: function(scope, element) {
        console.log(scope.ngModel);
        var buttonElem = element.find('button');
        buttonElem.bind('click', function() {
          scope.model = '';
        });
      }
    };
  });
