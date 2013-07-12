'use strict';

angular.module('radioApp')
  .factory('Genres', function($resource) {
      var genresCache = [];
      var genresHash = {};
      $resource('/genres').query(function(genresRs) {
        angular.forEach(genresRs, function(genre) {
          genresCache.push(genre);
          genresHash[genre.id] = genre;
        });
      });
    return {
      genres: function() {
        return genresCache;
      },
      genre: function(id) {
        return genresHash[id];
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