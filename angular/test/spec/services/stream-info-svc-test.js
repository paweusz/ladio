'use strict';

describe('Service: StreamInfoSvc', function () {

  beforeEach(module('ladioApp'));

  var StreamInfoSvc, $httpBackend;
  var expectedUrl1 = '@@API_URL/info?stream=http:%2F%2Fstream1.com:8081',
      expectedUrl2 = '@@API_URL/info?stream=http:%2F%2Fstream1.com:8081&stream=http:%2F%2Fstream2.com:8081';
  var streamUrl1 = 'http://stream1.com:8081',
      streamUrl2 = 'http://stream2.com:8081';

  beforeEach(inject(function ($injector, _StreamInfoSvc_) {
    StreamInfoSvc = _StreamInfoSvc_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', expectedUrl1).respond({
      title: 'Sunny song'
    });
    $httpBackend.when('GET', expectedUrl2).respond({
      title: 'Sunny song'
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch stream information based on one stream', function () {
    $httpBackend.expectGET(expectedUrl1);
    var rsp = StreamInfoSvc.getStreamInfo(streamUrl1);
    rsp.success(function(streamInfo) {
      expect(streamInfo.title).toEqual('Sunny song');
    }).error(function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

  it('should fetch stream information based on multiple streams', function () {
    $httpBackend.expectGET(expectedUrl2);
    var rsp = StreamInfoSvc.getStreamInfo([streamUrl1, streamUrl2]);
    rsp.success(function(streamInfo) {
      expect(streamInfo.title).toEqual('Sunny song');
    }).error(function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

});
