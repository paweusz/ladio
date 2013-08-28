'use strict';

angular.module('ladioApp')
  .service('StarredSrv', function starredSrv() {
    var starredKey = 'com.padio.starred';
    
    var starred = localStorage[starredKey];
    if (!starred) {
      starred = [];
    } else {
      starred = JSON.parse(starred);
    }
    
    function updateStorage() {
      localStorage[starredKey] = JSON.stringify(starred);
    }
    
    function findStation(station, stations) {
      for (var i = 0; i < stations.length; i++) {
        if (stations[i].id === station.id) {
          return i;
        }
      }
      return -1;
    }
    
    return {

      toggle: function(station) {
        var statIdx = findStation(station, starred);
        if (statIdx !== -1) {
          starred.splice(statIdx, 1);
        } else {
          starred.push(station);
        }
        updateStorage();
      },
      
      isStarred: function(station) {
        return findStation(station, starred) !== -1;
      },

      starred: function() {
        return starred;
      }

    };
  });
