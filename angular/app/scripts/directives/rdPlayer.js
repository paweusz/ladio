'use strict';

angular.module('radioApp')
  .directive('rdPlayer', function () {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.rdPlayer, function(streams) {
          console.debug('Playing streams ' + streams);
          element.children().remove();
          element.append('<audio autoplay="autoplay"></audio>');
          angular.forEach(streams, function(stream) {
            element.children().append('<source src="' + stream + '"></source>');
          });
        }, true);
      }
    };
  });
