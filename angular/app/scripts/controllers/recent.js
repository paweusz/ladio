'use strict';

angular.module('radioApp')
  .controller('RecentCtrl', function ($scope, Genres, Stat) {

    $scope.stations = Stat.recentStations();
    
  });
