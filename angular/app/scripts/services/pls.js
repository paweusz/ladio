'use strict';

angular.module('radioApp')
  .factory('Pls', function($resource) {

    var backend = {
      host: 'localhost',
      port: 9001
    };

    return {
      streams: function(url, callbackFn) {
        return $resource('http://:host\\::port/streams', backend).query({pls: url}, callbackFn);
      }
    };
  });
