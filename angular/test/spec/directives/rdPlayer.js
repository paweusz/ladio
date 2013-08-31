'use strict';

describe('Directive: rdPlayer', function () {
  beforeEach(module('ladioApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    $rootScope.streams = [];
    element = angular.element('<audio rd-player="streams"></audio>');
    element = $compile(element)($rootScope);
    
    $rootScope.$digest();
    
    expect(element.text()).toBe('this is the rdPlayer directive');
  }));
});
