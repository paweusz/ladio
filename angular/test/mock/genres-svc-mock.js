'use strict';

angular.module('ladioApp').factory('GenresSvcMock', function(HttpSvcMock) {

  return {
    searchSvcRsp: HttpSvcMock.newHttpPrms(),
    genres: function() {return HttpSvcMock.newHttpPrms();},
    search: function() {return this.searchSvcRsp;}
  }
});
