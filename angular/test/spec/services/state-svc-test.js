'use strict';

describe('Service StateSrv', function () {

  var StateSvc, localStorage;

  beforeEach(module('ladioApp'));
  beforeEach(inject(function(_StateSvc_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    StateSvc = _StateSvc_;
    localStorage = {};
  }));

  it('should store privacy message acknowledge state', function () {
  	expect(StateSvc.isPrivacyAck()).toBe(false);
  	StateSvc.setPrivacyAck(true);
  	expect(StateSvc.isPrivacyAck()).toBe(true);
  });

});
