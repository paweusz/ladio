'use strict';

angular.module('ladioApp')
  .service('StatSvc', function() {
    var recentKey = 'com.padio.recent';
    
    var recentStat = localStorage[recentKey];
    if (!recentStat) {
      recentStat = [];
    } else {
      //(PP)2013-09-18: Protection agains angular hash values in local storage, replace with angular.fromJson after couple of months
      recentStat = JSON.parse(recentStat, function(k, v) {
        var val = v;
        if (/^\$+/.test(k)) {
          val = undefined;
        }
        return val;
      });
    }

    function updateStorage() {
      localStorage[recentKey] = angular.toJson(recentStat);
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
