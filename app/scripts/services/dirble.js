'use strict';

angular.module('radioApp')
  .factory('Dirble', function($resource) {
    return {
      genres: function() {
        return $resource('/genres').query();
      },
      subGenres: function(genreId) {
        return $resource('/genres/:genreId').query({params:{genreId:genreId}});
      }
    }
  });