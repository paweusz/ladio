'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var SearchCtrl, scope, searchSvcRsp;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GenresSvcMock) {
    scope = $rootScope.$new();
    
    searchSvcRsp = GenresSvcMock.searchSvcRsp;    

    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope,
      Genres: GenresSvcMock
    });
  }));

  it('should search stations', function () {
    var result = [{
      name: 'tezt'
    }];
    
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    
    expect(scope.stations).toBe(null);
    searchSvcRsp.succCb(result);
    expect(scope.stations).toEqual(result);
  });
  
  it('should handle search stations errors', function () {
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    
    expect(scope.stations).toBe(null);
    searchSvcRsp.errCb(404, "Not found");
    expect(scope.stations).toEqual([]);
  });
  
  
  
});
