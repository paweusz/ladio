'use strict';

angular.module('ladioApp').factory('StreamInfoSvcMock', function(HttpSvcMock) {

  return {
    getStreamInfoRsp: HttpSvcMock.newHttpPrms(),
    getStreamInfo: function() {return this.getStreamInfoRsp;}
  }
});
