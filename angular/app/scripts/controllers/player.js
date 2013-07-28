'use strict';

angular.module('radioApp')
  .controller('PlayerCtrl', function ($scope, Pls) {

    $scope.State = {
      SUSPENDED: 0,
      PLAYING: 1
    };

    function prepareStreams(streams, stream) {
      streams.push(stream);
      //Shoutcast server trick
      if (stream.match(/\/$/)) {
        streams.push(stream + ';');
      } else {
        streams.push(stream + '/;');
      }
    }
    
    function playStreams(streamUrl) {
      var streams = [];
      if (streamUrl.match(/.pls$/)) {
        Pls.streams(streamUrl).success(function(plsStreams) {
          console.debug('Pls fetched.');
          angular.forEach(plsStreams, function(plsStream) {
            prepareStreams(streams, plsStream.url);
          });
        }).error(function(data, status) {
          console.error('Error fetching pls data. ' + status);
        });
      } else {
        prepareStreams(streams, streamUrl);
      }
      return streams;
    }
    
    function play(station) {
      $scope.streams = playStreams(station.streamurl);
      $scope.currentStation = {
        id: station.id,
        state: $scope.State.SUSPENDED
      };
    }
    
    function stop() {
      $scope.currentStation = null;
      $scope.streams = [];
    }
    
    function playOrStop(station) {
      if (!$scope.currentStation || $scope.currentStation && $scope.currentStation.id !== station.id) {
        play(station);
      } else {
        stop();
      }
    }
    
    $scope.playingStarted = function() {
      $scope.currentStation.state = $scope.State.PLAYING;
    };
    
    $scope.playingSuspended = function() {
      $scope.currentStation.state = $scope.State.SUSPENDED;
    };

    $scope.playingError = function() {
      $scope.currentStation = null;
    };
    
    $scope.$on('onStationChanged', function(event, station) {
      console.debug('Station changed to ' + station.name);
      playOrStop(station);
    });

    stop();

  });
