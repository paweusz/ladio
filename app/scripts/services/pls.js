'use strict';

angular.module('radioApp')
  .factory('Pls', function($resource) {
    return {
      streams: function(url) {
        return $resource('/streams').query({pls: url});
      }
    }
  });