'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, Stat, $filter) {

    $scope.stations = Stat.recentStations();
    
    $scope.filterChanged = function() {
      var filter = $scope.filter;
      if (!filter || filter === '') {
        $scope.stations = Stat.recentStations();
        return;
      }
      
      var regFilter = new RegExp(filter, 'i');
      $scope.stations = $filter('filter')(Stat.recentStations(),
        function(station) {
          return station.name.match(regFilter);
        });

    };
    
  });
