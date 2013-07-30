'use strict';

angular.module('radioApp')
  .service('Stat', function() {
    var recentKey = 'com.padio.recent';
    
    var recentStat = localStorage[recentKey];
    if (!recentStat) {
      recentStat = [];
    } else {
      recentStat = JSON.parse(recentStat);
    }
    
    function updateStorage() {
      localStorage[recentKey] = JSON.stringify(recentStat);
    }
    
    function findStation(station) {
      for (var i = 0; i < recentStat.length; i++) {
        if (recentStat[i].id === station.id) {
          return i;
        }
      }
      return -1;
    }
    
    return {

      stationPlayed: function(station) {
        var statIdx = findStation(station);
        if (statIdx !== -1) {
          recentStat.splice(statIdx, 1);
        }
        recentStat.unshift(station);
        recentStat = recentStat.slice(0, 6);

        updateStorage();        
      },

      recentStations: function() {
        return recentStat;
      }

    };
  });
