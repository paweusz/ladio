'use strict';

describe('Controller: GenresCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var GenresCtrl, scope, searchSvcRsp;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GenresSvcMock) {
    scope = $rootScope.$new();
    
    searchSvcRsp = GenresSvcMock.searchSvcRsp;    

    GenresCtrl = $controller('GenresCtrl', {
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
    
    expect(scope.stations).not.toBeDefined();
    searchSvcRsp.succCb(result);
    expect(scope.stations).toEqual(result);
  });
  
  it('should search stations', function () {
    scope.search.searchValue = 'tezt';
    scope.search.searchChanged();
    
    expect(scope.stations).not.toBeDefined();
    searchSvcRsp.errCb(404, "Not found");
    expect(scope.stations).toEqual([]);
  });
  
  
  
});
