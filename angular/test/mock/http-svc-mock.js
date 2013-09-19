'use strict';

angular.module('ladioApp').factory('HttpSvcMock', function() {

  function HttpPrms() {
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
    newHttpPrms: function() {
      return new HttpPrms();
    }
  }

});