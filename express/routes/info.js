'use strict';

var net = require('net'),
    url = require('url');

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

  var pStreamUrl = url.parse(streamUrl);
  var opts = {
    'host': pStreamUrl.hostname,
    'port': pStreamUrl.port
  };
  var clientReq = net.connect(opts, function () {
    var icyReq = 'GET ' + pStreamUrl.path + ' HTTP/1.0\r\n' +
                 'User-Agent: Ladio/0.1.3\r\n' +
                 'Host: ' + pStreamUrl.host + '\r\n' +
                 'Accept: */*\r\n' +
                 'Icy-MetaData: 1\r\n\r\n';
    clientReq.write(icyReq);
  }).on('error', errHandler);

  var data = '', is200,
      is200Regex = /^ICY 200 OK$/m,
      metaintRegex = /^icy-metaint:\s*\d+$/m,
      contypeRegex = /^content-type:\s*\S+$/m,
      metaIdx, contype, metaLen, hdrOffset;
  clientReq.on('data', function(buff) {
    
    var sbuff = buff.toString('ascii');

    data += sbuff;

    if (!is200) {
      is200 = data.match(is200Regex);
      if (!is200) {
        clientReq.destroy();
        errHandler({'message': 'Invalid ICY response'});
      }
    }

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

    if (!!metaLen && data.length > hdrOffset + metaIdx + metaLen + 1) {
      clientReq.destroy();

      var meta = data.substr(hdrOffset + metaIdx + 1, metaLen);
      var title = meta.substring(12, meta.indexOf(';'));

      rsp.json({
        'title': title,
        'content-type': contype
      });
    }

    if (data.length > 0xFFFF) {
      clientReq.destroy();
      errHandler({'message': 'No metadata found'});
    }

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
