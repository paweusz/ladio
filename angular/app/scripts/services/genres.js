'use strict';

angular.module('radioApp')
  .factory('Genres', function($resource, $q, $http) {
      var genresResult;
      var backend = {
        host: 'localhost',
        port: 9001
      };

      function genresPromise() {
        var genresDeferred = $q.defer();

        if (!genresResult) {
          $resource('http://:host\\::port/genres', backend).query(function(genresRs) {
            genresResult = {
              asArray: [],
              asHash: {}
            };
            angular.forEach(genresRs, function(genre) {
              genresResult.asArray.push(genre);
              genresResult.asHash[genre.id] = genre;
            });
            genresDeferred.resolve(genresResult);
            console.debug('got genres');
          });
        } else {
          genresDeferred.resolve(genresResult);
        }

        return genresDeferred.promise;
      }

      function subGenresPromise(genreId) {
        var subGenresDeferred = $q.defer();

        genresPromise().then(function(genres) {
          var genre = genres.asHash[genreId];
          if (!genre.subGenres) {
            var subGenres = {
              asArray: [],
              asHash: {}
            };
            genre.subGenres = subGenres;
            $resource('http://:host\\::port/genres/:genreId/subgenres', backend).query(
              {genreId:genreId}, function(subGenresRs) {
                angular.forEach(subGenresRs, function(subGenre) {
                  subGenres.asArray.push(subGenre);
                  subGenres.asHash[subGenre.id] = subGenre;
                });
                subGenresDeferred.resolve(subGenres);
                console.debug('got subgenres');
              });
          } else {
            subGenresDeferred.resolve(genre.subGenres);
          }
        });

        return subGenresDeferred.promise;
      }

      return {
        genres: function() {
          var result = [];
          genresPromise().then(function(genres) {
            result.push.apply(result, genres.asArray);
          });
          return result;
        },
        genre: function(id) {
          var result = {};
          genresPromise().then(function(genres) {
            var genre = genres.asHash[id];
            angular.extend(result, genre);
          });
          return result;
        },
        subGenres: function(genreId) {
          var result = [];
          subGenresPromise(genreId).then(function(subGenres) {
            result.push.apply(result, subGenres.asArray);
          });
          return result;
        },
        subGenre: function(genreId, subGenreId) {
          var result = {};
          subGenresPromise(genreId).then(function(subGenres) {
            var subGenre = subGenres.asHash[subGenreId];
            angular.extend(result, subGenre);
          });
          return result;
        },
        stations: function(genreId, subGenreId) {
          var result = [];
          subGenresPromise(genreId).then(function(subGenres) {
            var subGenre = subGenres.asHash[subGenreId];
            if (!subGenre.stations) {
              $http.get('http://' + backend.host + ':' + backend.port +
                '/genres/' + genreId + '/subgenres/' + subGenreId + '/stations')
                .success(function(stationsRs) {
                  console.debug('Stations fetched.');
                  subGenre.stations = stationsRs;
                  result.push.apply(result, subGenre.stations);
                })
                .error(function(data) {
                  console.error('Error fetching stations data. ' + data);
                });
            } else {
              result.push.apply(result, subGenre.stations);
            }
          });
          return result;
        }
      };
    });
