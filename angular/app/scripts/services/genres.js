'use strict';

angular.module('radioApp')
  .factory('Genres', function($resource, $q, $http) {

      var url = 'http://localhost:9001';

      return {

        genres: function() {
          return $http.get(url + '/genres', {
            cache: true
          });
        },

        genre: function(genreId) {
          return this.genres().then(function(data) {
            var genresRs = data.data;
            for (var i = 0; i < genresRs.length; i++) {
              var genre = genresRs[i];
              if (genre.id == genreId) {
                return genre;
              }
            }
            return null;
          });
        },
        
        subGenres: function(genreId) {
          return $http.get(url + '/genres/' + genreId + '/subgenres', {
            cache: true
          });
        },

        subGenre: function(genreId, subGenreId) {
          return this.subGenres(genreId).then(function(data) {
            var subGenresRs = data.data;
            for (var i = 0; i < subGenresRs.length; i++) {
              var subGenre = subGenresRs[i];
              if (subGenre.id == subGenreId) {
                return subGenre;
              }
            }
            return null;
          });
        },

        stations: function(genreId, subGenreId) {
          return $http.get(url + '/genres/' + genreId + '/subgenres/' + subGenreId + '/stations', {
            cache: true
          });
        }
        
      };
    });
