'use strict';

angular.module('radioApp')
  .factory('Pls', function($resource) {
    return {
      streams: function(url, callbackFn) {
        return $resource('/streams').query({pls: url}, callbackFn);
      }
    }
  });
