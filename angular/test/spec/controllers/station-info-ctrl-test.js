'use strict';

describe('Controller: StationInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var StationInfoCtrl, streamInfoSvcMock, scope, log, timeout;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StreamInfoSvcMock, $log, $timeout) {
    scope = $rootScope.$new();
    scope.Events = {
      STREAMS_CHANGED: 'STREAMS_CHANGED',
      PLAYING_STARTED: 'PLAYING_STARTED'
    };
    scope.playerPopups = {
      alert: false
    };

    streamInfoSvcMock = StreamInfoSvcMock;
    log = $log;
    timeout = $timeout;

    StationInfoCtrl = $controller('StationInfoCtrl', {
      $scope: scope,
      StreamInfoSvc: StreamInfoSvcMock,
      $log: log,
      $timeout: timeout
    });
  }));

  it('should attach station details object', function () {
    expect(scope.stationDetails).toBeDefined();
  });

  it('should provide current stream info', function () {
    scope.currentStation = {streams: ['stream1']};
    StationInfoCtrl.updateStationDetails();
    expect(scope.stationDetails.title).toBe(null);
    streamInfoSvcMock.getStreamInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.title).toBe('The title');
  });

  it('should handle service errors', function () {
    scope.currentStation = {streams: ['stream1']};
    StationInfoCtrl.updateStationDetails();
    streamInfoSvcMock.getStreamInfoRsp.errCb('Error', 503);
    expect(scope.stationDetails.title).toBe('Unknown');
    expect(scope.stationDetails.titleLink).toBe('');
    expect(log.error.logs[0]).toMatch(/503:Error/);
  });

  it('should return quietly when no streams are defined', function () {
    scope.currentStation = {streams: null};
    StationInfoCtrl.updateStationDetails();
    expect(scope.stationDetails.title).toBe('Unknown');
    expect(scope.stationDetails.titleLink).toBe('');
  });

  it('should produce title search links', function () {
    scope.currentStation = {streams: ['stream1']};
    StationInfoCtrl.updateStationDetails();
    expect(scope.stationDetails.titleLink).toBe(null);
    streamInfoSvcMock.getStreamInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.titleLink).toBe('http://www.google.com/search?q=The%20title');
  });

  it('should handle info popup visibility', function() {
    scope.currentStation = {streams: ['stream1']};
    spyOn(StationInfoCtrl, 'updateStationDetails').andCallThrough();
    scope.showStationDetails();

    expect(scope.stationPopups.details).toBe(true);
    expect(StationInfoCtrl.updateStationDetails).toHaveBeenCalled();

    scope.hideStationDetails();

    expect(scope.stationPopups.details).toBe(false);
    expect(StationInfoCtrl.updateStationDetails.calls.length).toBe(1);
  });

  it('should load stream info on STREAMS_CHANGED event', function() {
    spyOn(StationInfoCtrl, 'updateStationDetails');
    scope.$broadcast(scope.Events.STREAMS_CHANGED);
    expect(StationInfoCtrl.updateStationDetails).toHaveBeenCalled();
  });

  it('should show stream info on PLAYING_STARTED event', function() {
    spyOn(StationInfoCtrl, 'blinkPopup');
    scope.$broadcast(scope.Events.PLAYING_STARTED);
    expect(StationInfoCtrl.blinkPopup).toHaveBeenCalled();
  });

  it('should handle popup show/hide cycle', function() {
    expect(scope.stationPopups.details).toBe(false);
    StationInfoCtrl.blinkPopup();
    expect(scope.stationPopups.details).toBe(true);
    timeout.flush();
    expect(scope.stationPopups.details).toBe(false);
  });

  it('should revoke popup hiding when popup has been triggered externally', function() {
    scope.currentStation = {streams: ['stream1']};
    StationInfoCtrl.blinkPopup();
    expect(scope.stationPopups.details).toBe(true);
    scope.showStationDetails();
    timeout.verifyNoPendingTasks();
    expect(scope.stationPopups.details).toBe(true);
  });

});
