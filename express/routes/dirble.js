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
    var errHandler = function(e, rspCode) {
      var msg = 'Error processing catalog request (URL: ' + apiUrl + url.replace(apiKey, '...') + ', msg: ' + e.message + ')';
      console.log(msg); 
      console.log(e.stack);
      
      if (!rspCode) {
        rspCode = 503;
      }
      res.send(rspCode, msg);
    };
    http.get(apiUrl + url, function (http_res) {
      var data = '';

      http_res.on("data", function (chunk) {
        data += chunk;
      });
      
      http_res.on('error', errHandler);
      
      function processRsp(rspData) {
        var rspJson = JSON.parse(rspData);
        if (filter) {
          rspJson = _.filter(rspJson, filter);
        }
        cache.put(url, rspJson);
        res.json(rspJson);
      }
      
      http_res.on('end', function () {
        var statusCode = http_res.statusCode;
        if (statusCode !== 200 && statusCode !== 404) {
          errHandler({
            message: 'Dirble API response ' + statusCode,
            stack: 'doGetJson(url, res, filter)'
          }, statusCode);
          return;
        }
        
        try {
          processRsp(data);
        } catch (e) {
          errHandler(e);
        }
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
    doGetJson('/search/apikey/' + apiKey + '/search/' + encodeURIComponent(search) + query, res, function(station) {
      return station.name.match(regFilter);
    });
  }
};

