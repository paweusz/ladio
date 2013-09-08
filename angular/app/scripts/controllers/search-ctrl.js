'use strict';

angular.module('ladioApp')
  .controller('SearchCtrl', function ($scope, $routeParams, $log, GenresSvc) {

    var genreId = null;
    if ($routeParams.genreId) {
      genreId = parseInt($routeParams.genreId, 10);
    }

    $scope.stations = null;

    $scope.search = {
      searchValue: '',
    };
    
    $scope.$watch('search.searchValue', function(search) {
      if (search === '') {
        $scope.stations = null;
        return;
      }
      GenresSvc.search(search, genreId).then(function(data) {
        $log.log('Catalog searched for \'' + search + '\'.');
        $scope.stations = data;
      }, function(data, status) {
        $log.log('Error fetching catalog search data. (' + status + ':' + data + ')');
        $scope.stations = [];
      });
    });

  });
