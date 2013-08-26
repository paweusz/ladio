'use strict';

angular.module('radioApp')
  .directive('rdPlayer', function () {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var stalled = false;

        scope.$watch(attrs.rdPlayer, function(streams) {
          stalled = false;
          element.children().remove();

          if (!streams || streams.length === 0) {
            console.debug('No streams. Playing stopped.');
            element[0].load(); //Reset buffer to empty
            return;
          }
          
          console.debug('Playing streams ' + streams);
          
          var streamErrCnt = 0;
          angular.forEach(streams, function(stream) {
            element.append('<source src="' + stream + '"></source>');
          });

          element.children().bind('error', function() {
            console.debug('Playing stream error.');
            streamErrCnt++;
            if (streamErrCnt === streams.length) {
              console.debug('All streams failed to play');
              scope.$apply(attrs.onplayingerror);
            }
          });

          element[0].load();
          
        }, true);

        //Audio tag event handlers        
        element.bind('canplay', function() {
          console.debug('Ready to play.');
          element[0].play();
        });
        element.bind('playing', function() {
          console.debug('Playing started.');
          scope.$apply(attrs.onplayingstarted);
        });
        element.bind('error', function() {
          console.debug('Playing error.');
          scope.$apply(attrs.onplayingerror);
        });
        element.bind('stalled', function() {
          console.debug('Playing stalled.');
          stalled = true;
          scope.$apply(attrs.onplayingstalled);
        });
        element.bind('progress', function() {
          if (stalled) {
            console.debug('Playing progress.');
            stalled = false;
            scope.$apply(attrs.onplayingresumed);
          }
        });

        element.bind('abort canplay canplaythrough durationchange emptied ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange readystatechange seeked seeking stalled suspend Atimeupdate volumechange waiting', function(event) {
          console.debug('Event debugger: ' + event.type);
        });

/*        element.bind('abort emptied ended error pause play stalled suspend waiting', function(event) {
          console.debug('Audio event debugger: ' + event.type);
        });*/

        //Angular event handlers
        scope.$on('rd-player.pauseReq', function() {
          var audioTag = element[0];
          audioTag.pause();
          console.debug('Playing stopped.');
        });
        scope.$on('rd-player.playReq', function() {
          console.debug('Playing requested.');
          var audioTag = element[0];
          audioTag.play();
        });

      }
    };
  });
