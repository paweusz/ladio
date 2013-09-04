'use strict';

angular.module('ladioApp')
  .controller('StarredCtrl', function ($scope, StarredSrv, $filter, StationSearch) {

    var sorted = $filter('orderBy')(StarredSrv.starred(),
      function(station) {
        return station.name.trim();
      });
    $scope.stations = sorted;

    $scope.filtering = {
      filterChanged: function() {
        $scope.stations = StationSearch.search(sorted, this.filterValue);
      },
      filterValue: ''
    };

  });
