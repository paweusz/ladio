'use strict';

describe('Service: StreamInfoSvc', function () {

  beforeEach(module('ladioApp'));

  var StreamInfoSvc, $httpBackend;
  var expectedUrl = '@@API_URL/info?stream=http%3A%2F%2Fstream.com%3A8081';
  var streamUrl = 'http://stream.com:8081';

  beforeEach(inject(function ($injector, _StreamInfoSvc_) {
    StreamInfoSvc = _StreamInfoSvc_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', expectedUrl).respond({
      title: 'Sunny song'
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch stream information', function () {
    $httpBackend.expectGET(expectedUrl);
    var rsp = StreamInfoSvc.getStreamInfo(streamUrl);
    rsp.success(function(streamInfo) {
      expect(streamInfo.title).toEqual('Sunny song');
    }).error(function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

});
