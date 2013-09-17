'use strict';

angular.module('ladioApp')
  .factory('StationInfoSvc', function($http) {
    return {

      getStationInfo: function(stream) {
        return $http.get('@@API_URL/info', {
          params: {'stream': stream},
        });
      }

    };
  });
