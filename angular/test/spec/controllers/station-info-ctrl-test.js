'use strict';

describe('Controller: StationInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var StationInfoCtrl, streamInfoSvcMock, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StreamInfoSvcMock) {
    scope = $rootScope.$new();
    streamInfoSvcMock = StreamInfoSvcMock;
    StationInfoCtrl = $controller('StationInfoCtrl', {
      $scope: scope,
      StreamInfoSvc: StreamInfoSvcMock
    });
  }));

  it('should attach station details object', function () {
    expect(scope.stationDetails).toBeDefined();
  });

  it('should provide current stream info', function () {
    scope.currentStation = {streams: ['stream1']};
    scope.updateStationDetails();
    streamInfoSvcMock.getStreamInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.title).toBe('The title');
  });

});
