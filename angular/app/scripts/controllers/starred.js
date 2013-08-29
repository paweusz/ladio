'use strict';

angular.module('ladioApp')
  .controller('StarredCtrl', function ($scope, StarredSrv, $filter) {

    $scope.stations = $filter('orderBy')(StarredSrv.starred(),
      function(station) {
        return station.name.trim();
      });

  });
