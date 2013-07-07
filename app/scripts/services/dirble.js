'use strict';

angular.module('radioApp')
  .factory('Dirble', function($resource) {
    return {
      genres: function() {
        var Genre = $resource('/genres');
        var genres = Genre.query(function() {
          console.log('genre query');
        });
        return genres;
      }
    }
  });