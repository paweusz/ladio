'use strict';

angular.module('radioApp')
  .factory('Pls', function($http) {
    return {
      streams: function(url) {
        return $http.get('@@API_URL/streams', {
            params: {pls: url},
            cache: true
          });
      }
    };
  });
