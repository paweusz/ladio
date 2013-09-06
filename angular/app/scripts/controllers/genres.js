'use strict';

angular.module('ladioApp')
  .controller('GenresCtrl', function ($scope, $location, Genres) {

    Genres.genres().success(function(data) {
      console.debug('Genres fetched.');
      $scope.genres = data;
    }).error(function(data, status) {
      console.error('Error fetching genres data. (' + status + ':' + data + ')');
      $scope.genres = [];
    });
    
    $scope.select = function(genre) {
      $location.path('/genres/' + genre.id + '/subgenres');
    };
    
    $scope.search = {
      searchValue: '',
      searchChanged: function() {
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
