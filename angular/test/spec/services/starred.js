'use strict';

describe('Service: starred', function () {

  // load the service's module
  beforeEach(module('ladioApp'));

  // instantiate service
  var starred;
  beforeEach(inject(function (_starred_) {
    starred = _starred_;
  }));

  it('should do something', function () {
    expect(!!starred).toBe(true);
  });

});
