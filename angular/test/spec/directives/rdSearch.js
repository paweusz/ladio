'use strict';

describe('Directive: rdSearch', function () {

  // load the directive's module
  beforeEach(module('ladioApp'));
  
  var element, scope;

  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
    $httpBackend.whenGET('scripts/directives/rdSearch.html').passThrough();
  }));

  it('should have attributes of input', inject(function ($compile) {
    element = angular.element('<input placeholder="tezt" rd-search></input>');
    element = $compile(element)(scope);
    expect(element.attr('placeholder')).toBe('tezt');
  }));
});
