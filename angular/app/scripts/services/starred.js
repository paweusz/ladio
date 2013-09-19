'use strict';

angular.module('ladioApp')
  .service('StarredSrv', function starredSrv() {
    var starredKey = 'com.padio.starred';
    
    var starred = localStorage[starredKey];
    if (!starred) {
      starred = {};
    } else {
      //(PP)2013-09-18: Protection agains angular hash values in local storage, replace with angular.fromJson after couple of months
      starred = JSON.parse(starred, function(k, v) {
        var val = v;
        if (/^\$+/.test(k)) {
          val = undefined;
        }
        return val;
      });
    }
    
    function updateStorage() {
      localStorage[starredKey] = angular.toJson(starred);
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
        var stations = [];
        for (var key in starred) {
          stations.push(starred[key]);
        }
        return stations;
      }

    };
  });
