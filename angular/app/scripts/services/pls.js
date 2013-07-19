'use strict';

angular.module('radioApp')
  .factory('Pls', function($http) {
    return {
      streams: function(url, callbackFn) {
        return $http.get('http://localhost:9002/streams', {
            params: {pls: url}
          }).success(callbackFn)
          .error(function(data) {
            console.error('Error fetching pls data. ' + data);
          });
      }
    };
  });
