'use strict';

angular.module('ladioApp')
  .filter('SearchFilter', function ($filter) {
    return function(stations, filterValue) {
      if (!filterValue || filterValue.trim() === '') {
        return stations;
      }

      var regFilter = new RegExp(filterValue.trim(), 'i');
      return $filter('filter')(stations,
        function(station) {
          return station.name.match(regFilter);
        }
      );
    };
  }
);
