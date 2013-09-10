'use strict';

angular.module('ladioApp')
  .directive('rdSearch', function () {
    return {
      templateUrl: 'views/directives/rd-search.html',
      restrict: 'E',
      replace: true,
      scope: {
        placeholder: '@placeholder',
        model: '=model',
        disabled: '=disabled'
      },
      link: function(scope, element) {
        var buttonElem = element.find('button');
        buttonElem.bind('click', function() {
          scope.model = '';
        });

        var inputElem = element.find('input');
        function updateDisabledAttr(disabled) {
          if (disabled) {
            inputElem.attr('disabled', 'disabled');
          } else {
            inputElem.removeAttr('disabled');
          }
        }
        scope.$watch('disabled', updateDisabledAttr);
        updateDisabledAttr(scope.disabled);
      }
    };
  });
