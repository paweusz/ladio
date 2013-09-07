'use strict';

angular.module('ladioApp')
  .controller('SearchCtrl', function ($scope, $location, Genres) {

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

        Genres.search(this.searchValue).success(function(data) {
          console.debug('Catalog searched.');
          $scope.stations = data;
        }).error(function(data, status) {
          console.error('Error fetching catalog search data. (' + status + ':' + data + ')');
          $scope.stations = [];
        });
      }
    };

  });
