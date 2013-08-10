'use strict';

angular.module('radioApp')
  .service('State', function state() {
    var stateKey = 'com.padio.state';
    var stateObj = localStorage[stateKey];
    if (!stateObj) {
      stateObj = {};
    } else {
      stateObj = JSON.parse(stateObj);
    }
    
    function updateStorage() {
      localStorage[stateKey] = JSON.stringify(stateObj);
    }
    
    return {
      setLastURL: function(lastURL) {
        stateObj.lastURL = lastURL;
        updateStorage();
      },
      getLastURL: function() {
        var url = stateObj.lastURL;
        if (!url) {
          url = '/genres';
        }
        return url;
      }
    };
  });
