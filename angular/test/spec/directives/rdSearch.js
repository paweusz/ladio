'use strict';

describe('Directive: rdSearch', function () {

  // load the directive's module
  beforeEach(module('ladioApp'));
  beforeEach(module('scripts/directives/rdSearch.html'));
  
  var element, scope;

  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
  }));

  it('should have attributes of input', inject(function ($compile) {
    element = angular.element('<input placeholder="tezt" rd-search></input>');
    element = $compile(element)(scope);
    expect(element.attr('placeholder')).toBe('tezt');
  }));
});
