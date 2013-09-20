'use strict';

describe('Controller PlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var PlayerCtrl, scope, timeout;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $timeout, StatSvcMock) {
    scope = $rootScope.$new();
    timeout = $timeout;

    PlayerCtrl = $controller('PlayerCtrl', {
      $scope: scope,
      StatSvc: StatSvcMock,
      $timeout: timeout
    });
  }));

  it('should broadcast PLAYING_STARTED event only once for station playback', function () {
    var station = {id: 1, streamurl: 'stream1'};
    var events = [];
    scope.$on(scope.Events.PLAYING_STARTED, function(event) {
      events.push(event);
    });
    scope.play(station);
    scope.playingStarted();

    expect(events.length).toBe(1);

    scope.play(station);

    scope.play(station);
    scope.playingStarted();

    expect(events.length).toBe(1);
  });

  it('should display and hide _connecting_ popup when connecting', function() {
    var station = {id: 1, streamurl: 'stream1'};
    expect(scope.playerPopups.connecting).toBe(false);
    scope.play(station);
    expect(scope.playerPopups.connecting).toBe(true);
    timeout.flush();
    expect(scope.playerPopups.connecting).toBe(false);
  });

});