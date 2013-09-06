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
    
    searchSvcRsp.succCb(result);
    
    expect(scope.stations).toBe(result);
  });
});
