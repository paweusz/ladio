'use strict';

angular.module('ladioApp')
  .service('StarredSrv', function starredSrv() {
    var starredKey = 'com.padio.starred';
    
    var starred = localStorage[starredKey];
    if (!starred) {
      starred = {};
    } else {
      starred = JSON.parse(starred);
    }
    
    function updateStorage() {
      localStorage[starredKey] = JSON.stringify(starred);
    }
    
    return {

      toggle: function(station) {
        if (this.isStarred(station)) {
          delete starred[station.id];
        } else {
          starred[station.id] = station;
        }
        updateStorage();
      },
      
      isStarred: function(station) {
        return starred[station.id];
      },

      starred: function() {
        return starred;
      }

    };
  });
