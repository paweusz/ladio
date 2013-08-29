'use strict';

describe('Service: stat', function () {

  // load the service's module
  beforeEach(module('ladioApp'));

  // instantiate service
  var stat;
  beforeEach(inject(function (_stat_) {
    stat = _stat_;
  }));

  it('should do something', function () {
    expect(!!stat).toBe(true);
  });

});
