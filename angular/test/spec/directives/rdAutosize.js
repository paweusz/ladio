'use strict';

describe('Directive: rdAutosize', function () {
  beforeEach(module('radioApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-autosize></rd-autosize>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdAutosize directive');
  }));
});
