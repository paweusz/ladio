'use strict';

var net = require('net');

function doGetInfo(streamUrl, rsp) {
	var errHandler = function(e, rspCode) {
		var msg = 'Error processing info request (URL: ' + streamUrl + ', msg: ' + e.message + ')';
		console.log(msg);
		console.log(e.stack);

		if (!rspCode) {
		  rspCode = 503;
		}
		rsp.send(rspCode, msg);
	};

  console.log('Req stream ' + streamUrl);
  var opts = {
  	host: '85.25.86.69',
  	port: 8100
  };
  var clientReq = net.connect(opts, function () {
    clientReq.write('GET / HTTP/1.0\r\nIcy-MetaData:1\r\n\r\n');
  }).on('error', errHandler);

  var toLoad = 8192 * 2,
      data = '', 
      metaintRegex = /^icy-metaint:\s*\d+$/m,
      contypeRegex = /^content-type:\s*\S+$/m,
      metaIdx, contype, metaLen, hdrOffset;
  clientReq.on('data', function(buff) {
    
    var sbuff = buff.toString('ascii');

    data += sbuff;

    if (!metaIdx) {
      var metaint = metaintRegex.exec(data);
      if (metaint) {
        metaIdx = parseInt(metaint[0].match(/\d+/));
      }
    }

    if (!contype) {
      var contypeSrch = contypeRegex.exec(data);
      if (contypeSrch) {
        contype = contypeSrch[0].split(':')[1].trim();
      }
    }

    if (!hdrOffset) {
      var hdrIndex = data.indexOf('\r\n\r\n');
      if (hdrIndex != -1) {
        hdrOffset = hdrIndex + 4;
      }
    }

    if (!metaLen && !!metaIdx && !!hdrOffset && data.length > metaIdx + hdrOffset) {
      metaLen = data.charCodeAt(metaIdx + hdrOffset) * 0x10;
    }

    if (data.length > toLoad) {
      clientReq.destroy();

      var meta = data.substr(hdrOffset + metaIdx + 1, metaLen);
      var title = meta.substring(12, meta.indexOf(';'));

      rsp.json({
        'title': title,
        'content-type': contype
      });
    }

  });
  
  clientReq.on('end', function () {
    console.log('Disconnected');
  });


}


exports.info = function(req, rsp) {
  var streamUrl = req.query.stream;
  if (!streamUrl) {
    rsp.send(400);
    return;
  }
  
  doGetInfo(streamUrl, rsp);
};
