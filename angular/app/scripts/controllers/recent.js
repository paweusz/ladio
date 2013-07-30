'use strict';

angular.module('radioApp')
  .controller('RecentCtrl', function ($scope, Stat) {

    $scope.stations = Stat.recentStations();
    
  });
