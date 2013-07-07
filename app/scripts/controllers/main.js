'use strict';

angular.module('radioApp')
  .controller('MainCtrl', function ($scope, $resource, Dirble) {
    $scope.genres = Dirble.genres();
    $scope.play = function() {
      console.debug('play ' + this.thing.id);
    };
  });
