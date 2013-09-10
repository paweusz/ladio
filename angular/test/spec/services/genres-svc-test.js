'use strict';

describe('Service Genres', function () {

  beforeEach(module('ladioApp'));

  var GenresSvc, $httpBackend;
  var searchFor = 'tezt',
    genreId = 14,
    globSearchURL = '@@API_URL/genres/stations?search=' + searchFor,
    genreSearchURL = '@@API_URL/genres/' + genreId + '/stations?search=' + searchFor;
  
  beforeEach(inject(function ($injector, _GenresSvc_) {
    GenresSvc = _GenresSvc_;
    $httpBackend = $injector.get('$httpBackend');
    
    var stations = [{
      name: searchFor,
      status: 1
    }, {
      name: searchFor + '-disabled',
      status: 0
    }];
    $httpBackend.when('GET', globSearchURL).respond(stations);
    $httpBackend.when('GET', genreSearchURL).respond(stations);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should search stations in whole catalog', function () {
    $httpBackend.expectGET(globSearchURL);
    var rsp = GenresSvc.search(searchFor);
    rsp.then(function(rsp) {
      expect(rsp[0].name).toBe(searchFor);
    }, function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

  it('should search stations in genre', function () {
    $httpBackend.expectGET(genreSearchURL);
    var rsp = GenresSvc.search(searchFor, genreId);
    rsp.then(function(rsp) {
      expect(rsp[0].name).toBe(searchFor);
    }, function(data, status) {
      expect('No error').toBe(true);
    });
    $httpBackend.flush();
  });

  it('should filter disabled search stations', function () {
    $httpBackend.expectGET(genreSearchURL);
    var stations = GenresSvc.search(searchFor, genreId).then(function(rsp) {
      expect(rsp.length).toBe(1);
      expect(rsp[0].name).toBe(searchFor);
      expect(rsp[0].status).toBe(1);
    });
    $httpBackend.flush();
  });

});
