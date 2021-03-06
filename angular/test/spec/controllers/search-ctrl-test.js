'use strict';

describe('Controller SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var SearchCtrl, scope, genresSvc, timeout, browser;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $timeout, $browser, GenresSvcMock) {
    scope = $rootScope.$new();
    
    genresSvc = GenresSvcMock;
    spyOn(genresSvc, "search").and.callThrough();

    timeout = $timeout;
    browser = $browser;

    SearchCtrl = $controller('SearchCtrl', {
      $scope: scope,
      GenresSvc: GenresSvcMock,
      $timeout: timeout
    });
  }));

  it('should search stations in catalog', function () {
    var result = [{
      name: 'tezt'
    }];
    
    scope.search.searchValue = 'tezt';
    scope.$digest();
    timeout.flush();
    
    expect(genresSvc.search).toHaveBeenCalledWith('tezt', null);

    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.succCb(result);
    expect(scope.stations).toEqual(result);
  });
  
  it('should handle search stations errors', function () {
    scope.search.searchValue = 'tezt';
    scope.$digest();
    timeout.flush();
    
    expect(scope.stations).toBe(null);
    genresSvc.searchSvcRsp.errCb(404, "Not found");
    expect(scope.stations).toEqual([]);
  });
  
  it('should not search on first/empty event', function () {
    scope.$digest();
    expect(browser.deferredFns.length).toEqual(0); //timeout.verifyNoPendingTasks();
    expect(genresSvc.search).not.toHaveBeenCalled();
  });

  it('should not search for the same conditions', function () {
    scope.search.searchValue = 'tezt';

    scope.$digest();
    timeout.flush();

    expect(genresSvc.search.calls.count()).toEqual(1);

    scope.$digest();
    expect(browser.deferredFns.length).toEqual(0); //timeout.verifyNoPendingTasks();

    expect(genresSvc.search.calls.count()).toEqual(1);
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
      timeout.flush();

      expect(genresSvc.search).toHaveBeenCalledWith('tezt', 7);
    })
  });

  it('should cancel previous search when new requested', function() {
    scope.search.searchValue = 'tezt';
    scope.$digest();
    expect(browser.deferredFns.length).toEqual(1);

    scope.search.searchValue = 'tezta';
    scope.$digest();
    expect(browser.deferredFns.length).toEqual(1);
  });
  
  it('should remember last search conditions', function() {
    var result = [{
      name: 'tezt'
    }];

    scope.search.searchValue = 'teztA';
    scope.$digest();
    expect(scope.search.lastValue).toEqual('');
    timeout.flush();
    genresSvc.searchSvcRsp.succCb(result);
    expect(scope.search.lastValue).toEqual('teztA');

    scope.search.searchValue = 'teztB';
    scope.$digest();
    expect(scope.search.lastValue).toEqual('teztA');
    timeout.flush();
    genresSvc.searchSvcRsp.succCb(result);
    expect(scope.search.lastValue).toEqual('teztB');
  });
  
});
