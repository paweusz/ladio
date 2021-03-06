'use strict';

/**
 * Module dependencies.
 */

var express = require('express'),
  dirble = require('./routes/dirble'),
  pls = require('./routes/pls'),
  info = require('./routes/info'),
  http = require('http'),
  path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 9001);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../app')));
  app.use(express.errorHandler());
});

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Range, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

var path = '/api';
app.get(path + '/genres', dirble.genres);
app.get(path + '/genres/stations', dirble.stations);
app.get(path + '/genres/:genreId/subgenres', dirble.subGenres);
app.get(path + '/genres/:genreId/stations', dirble.stations);
app.get(path + '/genres/:genreId/subgenres/:subgenreId/stations', dirble.stations);
app.get(path + '/streams', pls.streams);
app.get(path + '/info', info.info);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
