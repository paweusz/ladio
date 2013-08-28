'use strict';

angular.module('ladioApp')
  .controller('StarCtrl', function ($scope) {
    
    $scope.star = function(station) {
      station.star = !station.star;
    };
    
    $scope.starCss = function(station) {
      var classes = [];
      if (station.star) {
        classes.push('starred');
      }
      return classes;
    };

  });
