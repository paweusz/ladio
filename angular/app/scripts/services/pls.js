'use strict';

angular.module('radioApp')
  .factory('Pls', function($http) {
    return {
      streams: function(url, callbackFn) {
        return $http.get('http://localhost:9001/streams', {
            params: {pls: url}
          }).success(function(data) {
            console.debug('Pls fetched.');
            callbackFn.apply(this, [data]);
          })
          .error(function(data) {
            console.error('Error fetching pls data. ' + data);
          });
      }
    };
  });
