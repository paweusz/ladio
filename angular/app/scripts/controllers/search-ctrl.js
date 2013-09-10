'use strict';

angular.module('ladioApp')
  .controller('SearchCtrl', function ($scope, $routeParams, $log, $timeout, GenresSvc) {

    var genreId = null;
    if ($routeParams.genreId) {
      genreId = parseInt($routeParams.genreId, 10);
    }

    $scope.stations = null;

    $scope.search = {
      searchValue: '',
      lastValue: ''
    };
    
    var toutPrms = null;
    $scope.$watch('search.searchValue', function(search) {
      $scope.stations = null;

      if (search === '') {
        return;
      }

      function svcSearch() {
        $log.log('Search catalog request for \'' + search + '\'.');
        GenresSvc.search(search, genreId).then(function(data) {
          $log.log('Catalog searched for \'' + search + '\'.');
          $scope.stations = data;
          $scope.search.lastValue = search;
        }, function(data, status) {
          $log.error('Error fetching catalog search data. (' + status + ':' + data + ')');
          $scope.stations = [];
          $scope.search.lastValue = search;
        });
      }

      if (!!toutPrms) {
        $timeout.cancel(toutPrms);
      }

      toutPrms = $timeout(svcSearch, 500);
    });

  });
