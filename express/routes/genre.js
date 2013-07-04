
/*
 * GET genres listing.
 */

exports.list = function(req, res){

  var http = require("http");

  var apiKey = 'b4c059a7383415cb5295c9faec124b151213a788';
  var url = 'http://dirble.com/dirapi/primaryCategories/apikey/' + apiKey;

  http.get(url, function (http_res) {
      var data = "";

      http_res.on("data", function (chunk) {
          data += chunk;
      });

      http_res.on("end", function () {
        res.json(JSON.parse(data));
      });
  });

};
