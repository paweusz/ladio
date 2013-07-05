'use strict';

angular.module('radioApp')
  .directive('rdGenre', function () {
    return {
      transclude: true,
      replace: true,
      scope: {
        onClick: '&'
      },
      templateUrl: 'scripts/directives/rdGenre.html',
      link: function(scope, iElement, iAttrs) {
        console.debug('postLink');
      }
    }
  });
