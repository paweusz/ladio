'use strict';

angular.module('ladioApp')
  .controller('StarredCtrl', function ($scope, StarredSrv, $filter) {

    var sorted = $filter('orderBy')(StarredSrv.starred(),
      function(station) {
        return station.name.trim();
      });
    $scope.stations = sorted;

    $scope.filtering = {
      filterValue: ''
    };
    $scope.$watch('filtering.filterValue', function(search) {
      $scope.stations = $filter('SearchFilter')(sorted, search);
    });

  });
