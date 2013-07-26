'use strict';

angular.module('radioApp')
  .controller('NavigationCtrl', function ($scope, $route, $location) {
    $scope.$on('$routeChangeSuccess', function() {
      $scope.genresCss = '';
      $scope.recentCss = '';

      var path = $location.path();
      if (path.match(/^\/genres/)) {
        $scope.genresCss = 'selected';
      } else if (path.match(/^\/recent/)) {
        $scope.recentCss = 'selected';
      }
    });
  });
