'use strict';

angular.module('ladioApp').factory('GenresSvcMock', function() {

  function SvcRsp() {
    this.succCb = null;
    this.success = function(succCb) {
      this.succCb = succCb;
      return {
        error: function(errCb) {}
      };
    };
  };

  return {
    searchSvcRsp: new SvcRsp(),
    genres: function() {return new SvcRsp();},
    search: function() {return this.searchSvcRsp;}
  }
});
