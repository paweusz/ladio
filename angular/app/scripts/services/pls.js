'use strict';

angular.module('radioApp')
  .factory('Pls', function($http) {
    return {
      streams: function(url) {
        return $http.get('http://notebook:9001/streams', {
            params: {pls: url},
            cache: true
          });
      }
    };
  });
