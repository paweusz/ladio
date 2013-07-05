'use strict';

angular.module('radioApp')
  .directive('rdGenre', function () {
    return {
      transclude: true,
      scope: {
        onClick: '&onClick'
      },
      templateUrl: 'scripts/directives/rdGenre.html',
      link: function(scope, iElement, iAttrs) {
        console.debug('postLink');
        iElement.bind('click', scope.onClick);
      }
    }
  });
