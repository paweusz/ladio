'use strict';

var http = require('http');

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

  var errHandler = function(e, rspCode) {
    var msg = 'Error processing pls request (URL: ' + ref + ', msg: ' + e.message + ')';
    console.log(msg);
    console.log(e.stack);

    if (!rspCode) {
      rspCode = 503;
    }
    res.send(rspCode, msg);
  };

  http.get(ref, function (httpRsp) {
    var data = '';

    httpRsp.on('data', function (chunk) {
      data += chunk;
    });
    
    function processRsp(rspData) {
      var streams = parsePls(rspData);
      var obj = [];
      for (var i = 0; i < streams.length; i++) {
        obj.push({url: streams[i]});
      }
      res.json(obj);
    }
      
    httpRsp.on('end', function () {
      var statusCode = httpRsp.statusCode;
      if (statusCode !== 200) {
        errHandler({
          message: 'Station pls response ' + statusCode,
          stack: 'doGetPls(ref, res)'
        }, statusCode);
        return;
      }
      
      try {
        processRsp(data);
      } catch (e) {
        errHandler(e);
      }
    });

    httpRsp.on('error', errHandler);
    
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
