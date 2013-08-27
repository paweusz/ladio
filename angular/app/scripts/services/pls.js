'use strict';

angular.module('ladioApp')
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
