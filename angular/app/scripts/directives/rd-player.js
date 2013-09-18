'use strict';

angular.module('ladioApp')
  .directive('rdPlayer', function ($log) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var maxReconnects = parseInt(attrs.maxreconnects, 10);

        var reconnectCnt = 0;
        var stalled = false;

        scope.$watch(attrs.rdPlayer, function(streams) {
          reconnectCnt = 0;
          stalled = false;
          
          element.children().remove();

          if (!streams || streams.length === 0) {
            $log.log('No streams. Playing stopped.');
            element[0].load(); //Reset buffer to empty
            return;
          }
          
          $log.log('Playing streams ' + streams);
          
          angular.forEach(streams, function(stream) {
            function appendStreamElem(streamSrc) {
              element.append('<source src="' + streamSrc + '"></source>');
            }
            appendStreamElem(stream);
            //Shoutcast server trick
            if (stream.match(/\/$/)) {
              appendStreamElem(stream + ';');
            } else {
              if (!stream.match(/;$/)) {
                appendStreamElem(stream + '/;');
              }
            }
          });

          element.children().bind('error', function() {
            $log.log('Playing stream error.');
            if (element[0].networkState === 3) { //HTMLMediaElement.NETWORK_NO_SOURCE
              $log.log('All streams failed to play');
              scope.$apply(attrs.onplayingerror);
            }
          });

          element[0].load();
          
        }, true);
        
        function reconnect() {
          reconnectCnt++;
          $log.log('Reconnecting (' + reconnectCnt + ').');
          element[0].load();
        }
        
        function handleError() {
          if (reconnectCnt === maxReconnects) {
            scope.$apply(attrs.onplayingerror);
          } else {
            reconnect();
          }
        }

        //Audio tag event handlers        
        element.bind('canplay', function() {
          $log.log('Ready to play.');
          element[0].play();
        });
        element.bind('playing', function() {
          $log.log('Playing started.');
          reconnectCnt = 0;
          scope.$apply(attrs.onplayingstarted);
        });
        element.bind('error', function() {
          $log.log('Playing error. Reason ' + element[0].error.code + '.');
          handleError();
        });
        element.bind('ended', function() {
          $log.log('Playing ended.');
          scope.$apply(attrs.onplayingstalled);
          handleError();
        });
        element.bind('stalled', function() {
          if (!element[0].paused) {
            $log.log('Playing stalled.');
            stalled = true;
            scope.$apply(attrs.onplayingstalled);
          }
        });
        element.bind('progress', function() {
          if (stalled) {
            $log.log('Playing progress.');
            stalled = false;
            scope.$apply(attrs.onplayingresumed);
          }
        });

        /*element.bind('abort canplay canplaythrough durationchange emptied ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange readystatechange seeked seeking stalled suspend Atimeupdate volumechange waiting', function(event) {
          $log.log('Event debugger: ' + event.type);
        });*/

        element.bind('abort emptied ended error pause play stalled suspend waiting', function(event) {
          $log.log('Audio event debugger: ' + event.type);
        });

        //Angular event handlers
        scope.$on('rd-player.pauseReq', function() {
          var audioTag = element[0];
          audioTag.pause();
          $log.log('Playing stopped.');
        });
        scope.$on('rd-player.playReq', function() {
          $log.log('Playing requested.');
          var audioTag = element[0];
          audioTag.play();
        });

      }
    };
  });
