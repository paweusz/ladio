'use strict';

describe('Directive: rdPlayer', function () {
  beforeEach(module('radioApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-player></rd-player>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdPlayer directive');
  }));
});
