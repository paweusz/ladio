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

    streamInfoSvcMock = StreamInfoSvcMock;
    log = $log;
    timeout = $timeout;

    $controller('PopupsCtrl', {
      $scope: scope,
      $timeout: timeout
    });

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
    scope.currentStation = {streams: ['stream1'], state: 0};
    scope.State = {ERROR: 3};
    spyOn(StationInfoCtrl, 'updateStationDetails').and.callThrough();
    scope.showStationDetails();

    expect(scope.popups.isVisible(StationInfoCtrl.Popups.DETAILS)).toBe(true);
    expect(StationInfoCtrl.updateStationDetails).toHaveBeenCalled();

    scope.hideStationDetails();

    expect(scope.popups.isVisible(StationInfoCtrl.Popups.DETAILS)).toBe(false);
    expect(StationInfoCtrl.updateStationDetails.calls.count()).toBe(1);
  });

  it('should show error popup for error state', function() {
    scope.currentStation = {streams: ['stream1'], state: 3};
    scope.State = {ERROR: 3};
    spyOn(StationInfoCtrl, 'updateStationDetails').and.callThrough();
    scope.showStationDetails();

    expect(scope.popups.isVisible(StationInfoCtrl.Popups.ALERT)).toBe(true);
    expect(StationInfoCtrl.updateStationDetails).not.toHaveBeenCalled();

    scope.hideStationDetails();

    expect(scope.popups.isVisible(StationInfoCtrl.Popups.ALERT)).toBe(false);
  });

  it('should load stream info on STREAMS_CHANGED event', function() {
    spyOn(StationInfoCtrl, 'updateStationDetails');
    scope.$broadcast(scope.Events.STREAMS_CHANGED);
    expect(StationInfoCtrl.updateStationDetails).toHaveBeenCalled();
  });

  it('should show stream info on PLAYING_STARTED event', function() {
    scope.$broadcast(scope.Events.PLAYING_STARTED);
    expect(scope.popups.isVisible(StationInfoCtrl.Popups.DETAILS)).toBe(true);
  });

});
