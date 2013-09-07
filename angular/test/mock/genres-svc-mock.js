'use strict';

angular.module('ladioApp').factory('GenresSvcMock', function() {

  function SvcRsp() {
    this.succCb = null;
    this.errCb = null;
    this.then = function(succCb, errCb) {
      this.succCb = succCb;
      this.errCb = errCb;
    };
  };

  return {
    searchSvcRsp: new SvcRsp(),
    genres: function() {return new SvcRsp();},
    search: function() {return this.searchSvcRsp;}
  }
});
