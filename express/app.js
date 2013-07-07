
/**
 * Module dependencies.
 */

var express = require('express')
  , genre = require('./routes/genre')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 9000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../app')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/genres', genre.genres);
app.get('/genres/:genreId/subgenres', genre.subGenres);
app.get('/genres/:genreId/subgenres/:subgenreId/stations', genre.stations);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
