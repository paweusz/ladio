'use strict';

var net = require('net'),
    url = require('url'),
    Q = require('q');

function fetchStreamInfo(streamUrl) {
  var d = Q.defer();

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
  })

  clientReq.on('error', function(err) {
    d.reject(err);
  });

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
        d.reject({'message': 'Invalid ICY response'});
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
      if (title.length > 2 && title.charAt(0) === '\'' && title.charAt(title.length - 1) === '\'') {
        title = title.substring(1, title.length - 1);
      }

      d.resolve({title: title, contype: contype});
    }

    if (data.length > 0xFFFF) {
      clientReq.destroy();
      d.reject({'message': 'No metadata found'});
    }

  });
  
  return d.promise;
}


exports.info = function(req, rsp) {
  var streamUrls = req.query.stream;
  if (!streamUrls) {
    rsp.send(400);
    return;
  }
  if (typeof streamUrls === 'string') {
    streamUrls = [streamUrls];
  }

  var streamIdx = 0;

  function processStream() {
    var streamUrl = streamUrls[streamIdx];
    var prms = fetchStreamInfo(streamUrl);
    prms.then(succCb, errCb);
  }
  
  function succCb(result) {
    rsp.json(result);
  }

  function errCb(e) {
    var msg = 'Error processing info request (URL: ' + streamUrls[streamIdx] + ', msg: ' + e.message + ')';
    console.log(msg);
    if (!!e.stack) {
      console.log(e.stack);
    }

    streamIdx++;
    if (streamIdx >= streamUrls.length) {
      rsp.send(503, msg);
    } else {
      processStream();
    }
  }

  processStream();

};
