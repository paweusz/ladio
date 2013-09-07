'use strict';

angular.module('ladioApp')
  .controller('SearchCtrl', function ($scope, $location, $log, Genres) {

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

        Genres.search(this.searchValue).success(function(data) {
          $log.log('Catalog searched for \'' + searchValue + '\'.');
          $scope.stations = data;
        }).error(function(data, status) {
          $log.log('Error fetching catalog search data. (' + status + ':' + data + ')');
          $scope.stations = [];
        });
      }
    };

  });
