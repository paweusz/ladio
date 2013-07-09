var http = require("http");

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
      var obj = [];
      for (var i = 0; i < streams.length; i++) {
        obj.push({url: streams[i]});
      }
      res.json(obj);
    });
  });
}

exports.streams = function(req, res) {
  var ref = req.query.pls;
  if (ref.match(/.pls$/)) {
    doGetPls(ref, res);
  } else {
    res.json([{url: ref}]);
  }
};
