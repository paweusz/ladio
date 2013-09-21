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
        var children = element.children();
        var inputElem = element.find('input');
        var inputCtrl = inputElem.controller('ngModel');
        var crossElem = angular.element(children[2]);

        crossElem.bind('click', function() {
          inputElem.val('');
          inputElem[0].focus();
          scope.$apply(function() {
            inputCtrl.$setViewValue('');
          });
        });

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
