'use strict';

describe('Directive rdSearch', function () {

  beforeEach(module('ladioApp'));

  beforeEach(function() {
  	module('scripts/directives/rd-search.html')	
  });

  var element;

  it('handles disabled attribute', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-search disabled="dattr"></rd-search>');
    $rootScope.dattr = true;
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    var inputElem = element.find('input');
    expect(inputElem.attr('disabled')).toEqual('disabled');

    $rootScope.dattr = false;
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    inputElem = element.find('input');
    expect(inputElem.attr('disabled')).not.toBeDefined();

    $rootScope.dattr = true;
    $rootScope.$digest();

    expect(inputElem.attr('disabled')).toEqual('disabled');
  }));
});
