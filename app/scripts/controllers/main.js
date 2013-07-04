'use strict';

angular.module('radioApp')
  .controller('MainCtrl', function ($scope, $resource) {
    var Genre = $resource('/genres');
    $scope.genres = Genre.query(function() {
      console.log('pimpa');
      
    });
  });
