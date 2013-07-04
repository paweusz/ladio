
/*
 * GET genres listing.
 */

exports.list = function(req, res){

  var http = require("http");

  var apiKey = 'b4c059a7383415cb5295c9faec124b151213a788';
  var url = 'http://dirble.com/dirapi/primaryCategories/apikey/' + apiKey;

  http.get(url, function (http_res) {
      // initialize the container for our data
      var data = "";

      // this event fires many times, each time collecting another piece of the response
      http_res.on("data", function (chunk) {
          // append this chunk to our growing `data` var
          data += chunk;
      });

      // this event fires *one* time, after all the `data` events/chunks have been gathered
      http_res.on("end", function () {
          // you can use res.send instead of console.log to output via express
        res.json(JSON.parse(data));
      });
  });

};
