'use strict';

angular.module('radioApp')
  .controller('HomeCtrl', function ($scope, Genres) {

    Genres.genres().success(function(data) {
      console.debug('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      console.error('Error fetching genres data. ' + status);
    });

    Genres.stations(1).then(function(stations) {
      console.debug('Stations fetched.');
      $scope.stations = stations;
    }, function(data) {
      console.error('Error fetching stations data. ' + data.status);
    });

  });
