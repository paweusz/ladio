'use strict';

angular.module('ladioApp').factory('StationInfoSvcMock', function(HttpSvcMock) {

  return {
    getStationInfoRsp: HttpSvcMock.newHttpPrms(),
    getStationInfo: function() {return this.getStationInfoRsp;}
  }
});
