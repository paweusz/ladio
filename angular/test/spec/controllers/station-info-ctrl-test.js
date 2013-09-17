'use strict';

describe('Controller: StationInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var StationInfoCtrl, stationInfoSvcMock, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StationInfoSvcMock) {
    scope = $rootScope.$new();
    stationInfoSvcMock = StationInfoSvcMock;
    StationInfoCtrl = $controller('StationInfoCtrl', {
      $scope: scope,
      StationInfoSvc: StationInfoSvcMock
    });
  }));

  it('should attach station details object', function () {
    expect(scope.stationDetails).toBeDefined();
  });

  it('should provide current stream info', function () {
    scope.currentStation = {streams: ['stream1']};
    scope.updateStationDetails();
    stationInfoSvcMock.getStationInfoRsp.succCb({title: 'The title'});
    expect(scope.stationDetails.title).toBe('The title');
  });

});
