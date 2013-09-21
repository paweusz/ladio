'use strict';

describe('Directive rdSearch', function () {

  beforeEach(module('ladioApp'));

  beforeEach(function() {
  	module('views/directives/rd-search.html')	
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

  it('clears input when clicking cross', inject(function ($rootScope, $compile) {
    $rootScope.test = {
      iModel: 'search'
    };

    element = angular.element('<rd-search disabled="dattr" model="test.iModel"></rd-search>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    var inputElem = angular.element(element.children()[1]);
    var crossElem = angular.element(element.children()[2]);
    crossElem.triggerHandler('click');
    $rootScope.$digest();

    expect($rootScope.test.iModel).toBe('');
    expect(inputElem.val()).toBe('');
  }));

  it('processes input', inject(function ($rootScope, $compile) {
    $rootScope.test = {
      iModel: 'search'
    };

    element = angular.element('<rd-search model="test.iModel"></rd-search>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    var inputElem = angular.element(element.children()[1]);
    var inputCtrl = inputElem.controller('ngModel');

    expect(inputElem.val()).toBe('search');

    inputCtrl.$setViewValue('testSearch');
    $rootScope.$digest();

    expect($rootScope.test.iModel).toBe('testSearch');
  }));

});
