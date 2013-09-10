'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, Stat, $filter) {

    var recent = Stat.recentStations();
    $scope.stations = recent;
    
    $scope.filtering = {
      filterValue: ''
    };
    $scope.$watch('filtering.filterValue', function(search) {
      $scope.stations = $filter('SearchFilter')(recent, search);
    });

  });
