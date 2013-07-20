var http = require("http");
var apiKey = 'b4c059a7383415cb5295c9faec124b151213a788';
var apiUrl = 'http://dirble.com/dirapi'

function doGetJson(url, res) {
  http.get(apiUrl + url, function (http_res) {
    var data = "";

    http_res.on("data", function (chunk) {
      data += chunk;
    });
    
    http_res.on("end", function () {
      var resJson = JSON.parse(data);
      res.json(resJson);
    });
  });
}

exports.genres = function(req, res) {
  doGetJson('/primaryCategories/apikey/' + apiKey, res);
};

exports.subGenres = function(req, res) {
  doGetJson('/childCategories/apikey/' + apiKey + '/primaryid/' + req.params.genreId, res);
};

exports.stations = function(req, res) {
  var genreId = req.params.subgenreId;
  if (!genreId) {
    genreId = req.params.genreId;
  }
  doGetJson('/stations/apikey/' + apiKey + '/id/' + genreId, res);
};

