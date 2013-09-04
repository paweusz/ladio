'use strict';

angular.module('ladioApp')
  .factory('StationSearch', function ($filter) {
    return {
      search: function(stations, filterValue) {
        if (!filterValue || filterValue.trim() === '') {
          return stations;
        }
        
        var regFilter = new RegExp(filterValue.trim(), 'i');
        return $filter('filter')(stations,
          function(station) {
            return station.name.match(regFilter);
          });

      }
    };
  });
