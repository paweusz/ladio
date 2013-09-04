'use strict';

angular.module('ladioApp')
  .controller('RecentCtrl', function ($scope, Stat, $filter) {

    $scope.stations = Stat.recentStations();
    
    $scope.filtering = {
      filterChanged: function() {
        var filter = this.filterValue;
        if (!filter || filter.trim() === '') {
          $scope.stations = Stat.recentStations();
          return;
        }
        
        var regFilter = new RegExp(filter.trim(), 'i');
        $scope.stations = $filter('filter')(Stat.recentStations(),
          function(station) {
            return station.name.match(regFilter);
          });

      },
      filterValue: ''
    };
    
  });
