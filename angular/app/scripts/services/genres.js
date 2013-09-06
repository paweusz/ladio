'use strict';

angular.module('ladioApp')
  .factory('Genres', function($http) {

      var url = '@@API_URL';

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
              if (genre.id === genreId) {
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
              if (subGenre.id === subGenreId) {
                return subGenre;
              }
            }
            return null;
          });
        },

        stations: function(genreId, subGenreId) {
          var options = {cache: true};
          var stationsPrms;
          if (subGenreId) {
            stationsPrms = $http.get(url + '/genres/' + genreId + '/subgenres/' + subGenreId + '/stations', options);
          } else {
            stationsPrms = $http.get(url + '/genres/' + genreId + '/stations', options);
          }
          return stationsPrms.then(function(data) {
            var result = [];
            var stations = data.data;
            for (var i = 0; i < stations.length; i++) {
              if (stations[i].status === 1) {
                result.push(stations[i]);
              }
            }
            return result;
          });
        },
        
        search: function(searchFor, genreId) {
          var uri;
          if (!genreId) {
            uri = '/genres/stations?search=' + encodeURIComponent(searchFor);
          } else {
            uri = '/genres/' + genreId + '/stations?search=' + encodeURIComponent(searchFor);
          }
          return $http.get(url + uri, {cache: true});
        }
        
      };
    });
