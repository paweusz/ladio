'use strict';

angular.module('radioApp')
  .factory('Pls', function($http) {
    return {
      streams: function(url) {
        return $http.get('http://localhost:9001/api/streams', {
            params: {pls: url},
            cache: true
          });
      }
    };
  });
