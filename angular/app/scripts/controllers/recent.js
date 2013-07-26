'use strict';

angular.module('radioApp')
  .controller('RecentCtrl', function ($scope, Genres) {

    Genres.stations(1).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = stations;
    }, function(data) {
      console.error('Error fetching stations data. ' + data.status);
    });

  });
