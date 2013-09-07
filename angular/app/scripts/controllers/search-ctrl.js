'use strict';

angular.module('ladioApp')
  .controller('SearchCtrl', function ($scope, $routeParams, $log, GenresSvc) {

    var genreId = null;
    if ($routeParams.genreId) {
      genreId = parseInt($routeParams.genreId, 10);
    }

    $scope.stations = null;
    var previousValue = '';

    $scope.search = {

      searchValue: previousValue,

      searchChanged: function() {
        if (this.searchValue === previousValue) {
          return;
        }
        if (this.searchValue === '') {
          $scope.stations = null;
          return;
        }
        previousValue = this.searchValue;
        var searchValue = this.searchValue;

        GenresSvc.search(this.searchValue, genreId).then(function(data) {
          $log.log('Catalog searched for \'' + searchValue + '\'.');
          $scope.stations = data;
        }, function(data, status) {
          $log.log('Error fetching catalog search data. (' + status + ':' + data + ')');
          $scope.stations = [];
        });
      }
    };

  });
