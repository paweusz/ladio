'use strict';

describe('Controller: StationInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var StationInfoCtrl, streamInfoSvcMock, scope, log;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StreamInfoSvcMock, $log) {
    scope = $rootScope.$new();
    streamInfoSvcMock = StreamInfoSvcMock;
    log = $log
    StationInfoCtrl = $controller('StationInfoCtrl', {
      $scope: scope,
      StreamInfoSvc: StreamInfoSvcMock,
      $log: log
    });
  }));

  it('should attach station details object', function () {
    expect(scope.stationDetails).toBeDefined();
  });

  it('should provide current stream info', function () {
    scope.currentStation = {streams: ['stream1']};
    scope.updateStationDetails();
    expect(scope.stationDetails.title).toBe(null);
    streamInfoSvcMock.getStreamInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.title).toBe('The title');
  });

  it('should handle service errors', function () {
    scope.currentStation = {streams: ['stream1']};
    scope.updateStationDetails();
    streamInfoSvcMock.getStreamInfoRsp.errCb('Error', 503);
    expect(scope.stationDetails.title).toBe('');
    expect(scope.stationDetails.titleLink).toBe('');
    expect(log.error.logs[0]).toMatch(/503:Error/);
  });

  it('should return quietly when no streams are defined', function () {
    scope.currentStation = {streams: null};
    scope.updateStationDetails();
    expect(scope.stationDetails.title).toBe('');
    expect(scope.stationDetails.titleLink).toBe('');
  });

  it('should produce title search links', function () {
    scope.currentStation = {streams: ['stream1']};
    scope.updateStationDetails();
    expect(scope.stationDetails.titleLink).toBe(null);
    streamInfoSvcMock.getStreamInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.titleLink).toBe('http://www.google.com/search?q=The%20title');
  });

});
