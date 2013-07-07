'use strict';

angular.module('radioApp')
  .factory('Dirble', function($resource) {
    return {
      genres: function() {
        return $resource('/genres').query();
      }
    }
  });