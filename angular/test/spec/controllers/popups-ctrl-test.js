'use strict';

describe('Controller: PopupsCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var PopupsCtrl, scope, timeout;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $timeout) {
    scope = $rootScope.$new();
    timeout = $timeout;

    PopupsCtrl = $controller('PopupsCtrl', {
      $scope: scope,
      $timeout: timeout
    });
  }));

  it('should show/hide popups', function () {
    var id = 'popupId';
    expect(scope.popups.isVisible(id)).toBe(false);
    scope.popups.show(id);
    expect(scope.popups.isVisible(id)).toBe(true);
    scope.popups.hide(id);
    expect(scope.popups.isVisible(id)).toBe(false);
  });

  it('should autohide popups', function () {
    var id = 'popupId';
    scope.popups.show(id, 1000);
    expect(scope.popups.isVisible(id)).toBe(true);
    timeout.flush();
    expect(scope.popups.isVisible(id)).toBe(false);
  });

  it('should cancel autohide', function () {
    var id = 'popupId';
    scope.popups.show(id, 1000);
    expect(scope.popups.isVisible(id)).toBe(true);
    scope.popups.cancelAutohide(id);
    timeout.verifyNoPendingTasks();
    expect(scope.popups.isVisible(id)).toBe(true);
  });

  it('should hide all popups', function () {
    scope.popups.show('A');
    scope.popups.show('B', 1000);
    scope.popups.show('C');
    scope.popups.hide('C');

    scope.popups.hideAll();

    expect(scope.popups.isVisible('A')).toBe(false);
    expect(scope.popups.isVisible('B')).toBe(false);
    expect(scope.popups.isVisible('C')).toBe(false);
  });

  it('should hide other popups when showing new exclusively', function () {
    scope.popups.showExclusive('A');
    scope.popups.showExclusive('B');
    scope.popups.showExclusive('C');

    expect(scope.popups.isVisible('A')).toBe(false);
    expect(scope.popups.isVisible('B')).toBe(false);
    expect(scope.popups.isVisible('C')).toBe(true);
  });

});
