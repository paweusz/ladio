var http = require("http");
var apiKey = 'b4c059a7383415cb5295c9faec124b151213a788';
var apiUrl = 'http://dirble.com/dirapi'

function doGet(url, res) {
  http.get(apiUrl + url, function (http_res) {
    var data = "";

    http_res.on("data", function (chunk) {
        data += chunk;
    });

    http_res.on("end", function () {
      res.json(JSON.parse(data));
    });
  });
}

exports.genres = function(req, res){
  doGet('/primaryCategories/apikey/' + apiKey, res);
};

exports.subGenres = function(req, res){
  doGet('/childCategories/apikey/' + apiKey + '/primaryid/' + req.params.genreId, res);
};
