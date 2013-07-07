'use strict';

angular.module('radioApp')
  .factory('Genres', function($resource) {
    return {
      genres: function() {
        return $resource('/genres').query();
      },
      subGenres: function(genreId) {
        return $resource('/subgenres/:genreId').query({genreId:genreId});
      }
    }
  });