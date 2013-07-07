'use strict';

angular.module('radioApp')
  .controller('GenresCtrl', function ($scope, $resource, Dirble) {
    $scope.genres = Dirble.genres();
    $scope.play = function() {
      console.debug('play ' + this.thing.id);
    };
  });
