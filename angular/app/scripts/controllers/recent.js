'use strict';

angular.module('radioApp')
  .controller('RecentCtrl', function ($scope, Genres) {

    Genres.stations(1).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = stations;
    }, function(data) {
      console.error('Error fetching stations data. ' + data.status);
    });
    
    $scope.play = function(station) {
      $scope.$emit('onStationChanged', station);
    };

    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      var currentStation = $scope.currentStation;
      if (currentStation && currentStation.id === this.station.id) {
        if (currentStation.state === $scope.State.PLAYING) {
          classes.push('playing');
        } else if (currentStation.state === $scope.State.SUSPENDED) {
          classes.push('suspended');
        }
      }
      return classes.join(' ');
    };
    
  });
