'use strict';

angular.module('ladioApp')
  .factory('StreamInfoSvc', function($http) {
    return {

      getStreamInfo: function(stream) {
        return $http.get('@@API_URL/info', {
          params: {'stream': stream},
        });
      }

    };
  });
