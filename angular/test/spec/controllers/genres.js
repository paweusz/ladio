'use strict';

describe('Controller: GenresCtrl', function () {

  // load the controller's module
  beforeEach(module('ladioApp'));

  var GenresCtrl, scope, searchSvcRsp;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    
    function SvcRsp() {
      this.succCb = null;
      this.success = function(succCb) {
        this.succCb = succCb;
        return {
          error: function(errCb) {}
        };
      };
    };

    searchSvcRsp = new SvcRsp();    
    var mockGenresSvc = {
      genres: function() {return new SvcRsp();},
      search: function() {return searchSvcRsp;}
    };

    GenresCtrl = $controller('GenresCtrl', {
      $scope: scope,
      Genres: mockGenresSvc
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
