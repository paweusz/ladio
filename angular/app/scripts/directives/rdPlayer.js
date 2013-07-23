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
          
          var streamErrCnt = 0;
          element.append('<audio autoplay="autoplay"></audio>');
          angular.forEach(streams, function(stream) {
            element.children().append('<source src="' + stream + '"></source>');
          });
          element.children().bind('playing', function() {
            console.debug('Playing started.');
            scope.$apply(attrs.onplayingstarted);
          });
          element.children().bind('error', function() {
            console.debug('Playing error.');
            scope.$apply(attrs.onplayingerror);
          });
          element.children().children().bind('error', function() {
            console.debug('Playing stream error.');
            streamErrCnt++;
            if (streamErrCnt === streams.length) {
              console.debug('All streams failed to play');
              scope.$apply(attrs.onplayingerror);
            }
          });
          element.children().bind('suspend', function() {
            console.debug('Playing suspended.');
            scope.$apply(attrs.onplayingsuspended);
          });
        }, true);
      }
    };
  });
