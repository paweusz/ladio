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
  var errHandler = function(e) {
    var msg = 'Error processing pls request (URL: ' + ref + ', msg: ' + e.message + ')';
    console.log(msg); 
    console.log(e.stack);
    res.send(503, msg);
  };
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

    http_res.on('error', errHandler);
    
  }).on('error', errHandler);
}

exports.streams = function(req, res) {
  var ref = req.query.pls;
  if (!ref) {
    res.send(400);
    return;
  }
  
  doGetPls(ref, res);
};
