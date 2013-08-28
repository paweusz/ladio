'use strict';

angular.module('ladioApp')
  .controller('StarCtrl', function ($scope, StarredSrv) {
    
    $scope.star = function(station) {
      StarredSrv.toggle(station);
    };
    
    $scope.starCss = function(station) {
      var classes = [];
      if (StarredSrv.isStarred(station)) {
        classes.push('starred');
      }
      return classes;
    };

  });
