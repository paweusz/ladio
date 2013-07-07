'use strict';

angular.module('radioApp')
  .factory('Genres', function($resource) {
    return {
      genres: function() {
        return $resource('/genres').query();
      },
      subGenres: function(genreId) {
        return $resource('/genres/:genreId/subgenres').query({genreId:genreId});
      },
      stations: function(genreId, subGenreId) {
        return $resource('/genres/:genreId/subgenres/:subGenreId/stations').query(
          {genreId: genreId, subGenreId: subGenreId});
      }
    }
  });