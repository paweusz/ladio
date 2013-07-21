'use strict';

angular.module('radioApp')
  .controller('StationsCtrl', function ($scope, $routeParams, Genres, Pls) {

    $scope.genreId = parseInt($routeParams.genreId, 10);

    Genres.genre($scope.genreId).then(function(genre) {
      console.debug('Genre fetched. ' + genre.name);
      $scope.genre = genre;
    }, function(data) {
      console.debug('Error fetching genre. ' + data.status);
    });

    if ($routeParams.subGenreId) {
      $scope.subGenreId = parseInt($routeParams.subGenreId, 10);
      Genres.subGenre($scope.genreId, $scope.subGenreId).then(function(subGenre) {
        console.debug('Subgenre fetched. ' + subGenre.name);
        $scope.subGenre = subGenre;
      }, function(data) {
        console.debug('Error fetching subgenre. ' + data.status);
      });
    } else {
      $scope.subGenreId = $scope.genreId;
      $scope.subGenre = {
        name: ''
      };
    }
    
    Genres.stations($scope.subGenreId).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = stations;
    }, function(data) {
      console.error('Error fetching stations data. ' + data.status);
    });

    $scope.currentStationId = null;
    $scope.streams = [];

    $scope.play = function() {
      console.debug('Play ' + this.station.name);

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
      
      if ($scope.currentStationId !== this.station.id) {
        $scope.streams = playStreams(this.station.streamurl);
        $scope.currentStationId = this.station.id;
      } else {
        $scope.streams = [];
        $scope.currentStationId = null;
      }
    };

    $scope.stop = function() {
      var streamUrl = this.station.streamurl;
      console.debug('stop ' + streamUrl);
    };
    
    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      if ($scope.currentStationId === this.station.id) {
        classes.push('playing');
      }
      return classes.join(' ');
    };
    
    $scope.isPanelVisible = function() {
      return false;
    };

  });
