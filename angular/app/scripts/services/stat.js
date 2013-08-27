'use strict';

angular.module('ladioApp')
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
        recentStat.unshift(angular.copy(station));
        recentStat.splice(30, recentStat.length - 30);

        updateStorage();
      },

      recentStations: function() {
        return recentStat;
      }

    };
  });
