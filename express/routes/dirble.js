'use strict';

var http = require("http");
var cache = require("./cache");
var _ = require("underscore");

var apiKey = 'b4c059a7383415cb5295c9faec124b151213a788';
var apiUrl = 'http://dirble.com/dirapi'

function doGetJson(url, res, filter) {
  var cached = cache.get(url);
  if (cached) {
    res.json(cached);
  } else {
    var errHandler = function(e) {
      var msg = 'Error processing catalog request (URL: ' + apiUrl + url.replace(apiKey, '...') + ', msg: ' + e.message + ')';
      console.log(msg); 
      console.log(e.stack);
      res.send(503, msg);
    };
    http.get(apiUrl + url, function (http_res) {
      var data = "";

      http_res.on("data", function (chunk) {
        data += chunk;
      });
      
      http_res.on('error', errHandler);
      
      http_res.on("end", function () {
        var resJson = JSON.parse(data);
        if (filter) {
          resJson = _.filter(resJson, filter);
        }
        cache.put(url, resJson);
        res.json(resJson);
      });
    }).on('error', errHandler);
  }
}

exports.genres = function(req, res) {
  doGetJson('/primaryCategories/apikey/' + apiKey, res);
};

exports.subGenres = function(req, res) {
  doGetJson('/childCategories/apikey/' + apiKey + '/primaryid/' + req.params.genreId, res);
};

exports.stations = function(req, res) {
  var genreId = req.params.subgenreId;
  var search = req.query.search;
  if (!genreId) {
    genreId = req.params.genreId;
  }
  if (!search) {
    doGetJson('/stations/apikey/' + apiKey + '/id/' + genreId, res);
  } else {
    var query = '';
    if (!!genreId) {
      query = '?genre=' + genreId;
    }
    var regFilter = new RegExp(search.trim(), 'i');
    doGetJson('/search/apikey/' + apiKey + '/search/' + search + query, res, function(station) {
      return station.name.match(regFilter);
    });
  }
};

