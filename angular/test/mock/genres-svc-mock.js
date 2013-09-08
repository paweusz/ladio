'use strict';

angular.module('ladioApp').factory('GenresSvcMock', function() {

  function SvcRsp() {
    this.succCb = null;
    this.errCb = null;
    this.then = function(succCb, errCb) {
      this.succCb = succCb;
      this.errCb = errCb;
    };
    this.success = function(succCb) {
      this.succCb = succCb;
      return this;
    };
    this.error = function(errCb) {
      this.errCb = errCb;
      return this;
    };
  };

  return {
    searchSvcRsp: new SvcRsp(),
    genres: function() {return new SvcRsp();},
    search: function() {return this.searchSvcRsp;}
  }
});
