'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, Stat) {

    $scope.stations = Stat.recentStations();
    
  });
