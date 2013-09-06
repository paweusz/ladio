'use strict';

describe('Service: Genres', function () {

  beforeEach(module('ladioApp'));

  var Genres, $httpBackend;
  var searchFor = 'tezt',
    genreId = 14,
    globSearchURL = '@@API_URL/genres/stations?search=' + searchFor,
    genreSearchURL = '@@API_URL/genres/' + genreId + '/stations?search=' + searchFor;
  
  beforeEach(inject(function ($injector, _Genres_) {
    Genres = _Genres_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', globSearchURL).respond({name: searchFor});
    $httpBackend.when('GET', genreSearchURL).respond({name: searchFor});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should search stations in whole catalog', function () {
    $httpBackend.expectGET(globSearchURL);
    var rsp = Genres.search(searchFor);
    rsp.success(function(data) {
      expect(data.name).toBe(searchFor);
    }).error(function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

  it('should search stations in genre', function () {
    $httpBackend.expectGET(genreSearchURL);
    var rsp = Genres.search(searchFor, genreId);
    rsp.success(function(data) {
      expect(data.name).toBe(searchFor);
    }).error(function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

});
