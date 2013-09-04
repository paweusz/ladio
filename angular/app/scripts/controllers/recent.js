'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, Stat, StationSearch) {

    var recent = Stat.recentStations();
    $scope.stations = recent;
    
    $scope.filtering = {
      filterChanged: function() {
        $scope.stations = StationSearch.search(recent, this.filterValue);
      },
      filterValue: ''
    };

  });
