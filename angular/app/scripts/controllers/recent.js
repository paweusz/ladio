'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, StatSvc, $filter) {

    var recent = StatSvc.recentStations();
    $scope.stations = recent;
    
    $scope.filtering = {
      filterValue: ''
    };
    $scope.$watch('filtering.filterValue', function(search) {
      $scope.stations = $filter('SearchFilter')(recent, search);
    });

  });
