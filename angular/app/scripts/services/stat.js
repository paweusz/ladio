'use strict';

angular.module('radioApp')
  .service('Stat', function() {
    var recentStat = [];
    
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
      },

      recentStations: function() {
        return recentStat;
      }

    };
  });
