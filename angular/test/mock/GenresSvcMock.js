'use strict';

angular.module('ladioApp').factory('GenresSvcMock', function() {

  function SvcRsp() {
    this.succCb = null;
    this.errCb = null;
    this.success = function(succCb) {
      this.succCb = succCb;
      var self = this;
      return {
        error: function(errCb) {
          self.errCb = errCb;
        }
      };
    };
  };

  return {
    searchSvcRsp: new SvcRsp(),
    genres: function() {return new SvcRsp();},
    search: function() {return this.searchSvcRsp;}
  }
});
