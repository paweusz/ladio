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

function parsePls(pls) {
  var result = [];
  var lines = pls.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.match(/^File\d+=/)) {
      var url = line.substr(line.indexOf('=') + 1);
      result.push(url);
    }
  }
  return result;
}

function doGetPls(ref, res) {
  console.log(ref);
  http.get(ref, function (http_res) {
    var data = "";

    http_res.on("data", function (chunk) {
      data += chunk;
    });
      
    http_res.on("end", function () {
      var streams = parsePls(data);
      res.json(streams);
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
  doGetJson('/stations/apikey/' + apiKey + '/id/' + req.params.subgenreId, res);
};

exports.streams = function(req, res) {
  var ref = req.query.ref;
  if (ref.match(/.pls$/)) {
    doGetPls(ref, res);
  } else {
    res.json([ref]);
  }
};
