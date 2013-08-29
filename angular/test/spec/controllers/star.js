'use strict';

describe('Controller: StarCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var StarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StarCtrl = $controller('StarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
