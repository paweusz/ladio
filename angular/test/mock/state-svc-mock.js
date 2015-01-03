'use strict';

angular.module('ladioApp').factory('StateSvcMock', function() {

  var storage = {};

  return {
    setPrivacyAck: function(privacyAck) {
    	storage.privacyAck = privacyAck;
    },
    isPrivacyAck: function() {
    	return !!storage.privacyAck;
    }
  }
});
