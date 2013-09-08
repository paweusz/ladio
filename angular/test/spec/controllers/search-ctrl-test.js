'use strict';

describe('Controller SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var SearchCtrl, scope, genresSvc, searchSvcRsp;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GenresSvcMock) {
    scope = $rootScope.$new();
    
    genresSvc = GenresSvcMock;
    spyOn(genresSvc, "search").andCallThrough();

    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope,
      GenresSvc: GenresSvcMock
    });
  }));

  it('should search stations in catalog', function () {
    var result = [{
      name: 'tezt'
    }];
    
    scope.search.searchValue = 'tezt';
    scope.$digest();
    
    expect(genresSvc.search).toHaveBeenCalledWith('tezt', null);

    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.succCb(result);
    expect(scope.stations).toEqual(result);
  });
  
  it('should handle search stations errors', function () {
    scope.search.searchValue = 'tezt';
    scope.$digest();
    
    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.errCb(404, "Not found");
    expect(scope.stations).toEqual([]);
  });
  
  it('should not search on first/empty event', function () {
    scope.$digest();
    expect(genresSvc.search).not.toHaveBeenCalled();
  });

  it('should not search for the same conditions', function () {
    scope.search.searchValue = 'tezt';
    scope.$digest();
    expect(genresSvc.search.calls.length).toEqual(1);
    scope.$digest();
    expect(genresSvc.search.calls.length).toEqual(1);
  });
  
  it('handles search in genre', function() {
    inject(function ($controller, $rootScope, GenresSvcMock) {

      var genreSearchCtrl = $controller('SearchCtrl', {
        $scope: scope,
        GenresSvc: GenresSvcMock,
        $routeParams: {
          genreId: 7
        }
      });
      
      scope.search.searchValue = 'tezt';
      scope.$digest();
      expect(genresSvc.search).toHaveBeenCalledWith('tezt', 7);
    })
  });
  
});
