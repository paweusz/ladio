'use strict';

angular.module('ladioApp')
  .controller('StarredCtrl', function ($scope, StarredSrv) {

    $scope.stations = StarredSrv.starred();

  });
