'use strict';

describe('Controller SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var SearchCtrl, scope, genresSvc, searchSvcRsp;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GenresSvcMock) {
    scope = $rootScope.$new();
    
    genresSvc = GenresSvcMock;

    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope,
      GenresSvc: GenresSvcMock
    });
  }));

  it('should search stations', function () {
    var result = [{
      name: 'tezt'
    }];
    
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    
    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.succCb(result);
    expect(scope.stations).toEqual(result);
  });
  
  it('should handle search stations errors', function () {
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    
    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.errCb(404, "Not found");
    expect(scope.stations).toEqual([]);
  });
  
  it('should not search on first/empty event', function () {
    spyOn(genresSvc, "search").andCallThrough();
    scope.search.searchChanged();
    expect(genresSvc.search).not.toHaveBeenCalled();
  });
  
  it('should not search for the same conditions', function () {
    spyOn(genresSvc, "search").andCallThrough();
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    expect(genresSvc.search.calls.length).toEqual(1);
    scope.search.searchChanged();
    expect(genresSvc.search.calls.length).toEqual(1);
  });
  
});
