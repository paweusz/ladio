'use strict';

angular.module('ladioApp')
  .controller('PlayerCtrl', function ($scope, $log, $timeout, Pls, StatSvc) {

    var isGa = typeof ga !== 'undefined';

    $scope.State = {
      STOPPED: 0,
      CONNECTING: 1,
      PLAYING: 2,
      ERROR: 3
    };

    $scope.Events = {
      STREAMS_CHANGED: 'STREAMS_CHANGED',
      PLAYING_STARTED: 'PLAYING_STARTED'
    };

    $scope.currentStation = {
      station: null,
      streams: null,
      state: $scope.State.STOPPED,
      wasPlayed: false,
      errorMsg: 'Error connecting to station. Please try again later.'
    };

    var self = this;
    self.Popups = {
      ALERT: 'PlayerCtrl.ALERT',
      CONNECTING: 'PlayerCtrl.CONNECTING'
    };

    function playStreams(streamUrl) {
      var streams = [];
      if (streamUrl.match(/.pls$/)) {
        Pls.streams(streamUrl).success(function(plsStreams) {
          $log.log('Pls fetched.');
          angular.forEach(plsStreams, function(plsStream) {
            streams.push(plsStream.url);
          });
          $scope.$broadcast($scope.Events.STREAMS_CHANGED);
        }).error(function(data, status) {
          $log.error('Error fetching pls data. (' + status + ':' + data + ')');
          $scope.playingError();
        });
      } else {
        streams.push(streamUrl);
        $timeout(function() {
          $scope.$broadcast($scope.Events.STREAMS_CHANGED);
        });
      }
      return streams;
    }
    
    function playOrStop(station) {
      var cs = $scope.currentStation;
      if (!station) {
        station = cs.station;
      }

      if (!!cs.station && cs.station.id === station.id) {//Clicked the same station
        switch (cs.state) {
        case $scope.State.CONNECTING:
          cs.streams = [];
          cs.station = null;
          cs.state = $scope.State.STOPPED;
          return;
        case $scope.State.PLAYING:
          $scope.$broadcast('rd-player.pauseReq');
          cs.state = $scope.State.STOPPED;
          return;
        case $scope.State.STOPPED:
          $scope.$broadcast('rd-player.playReq');
          cs.state = $scope.State.CONNECTING;
          return;
        }
      }

      //Prepare playing of new station
      cs.station = station;
      cs.wasPlayed = false;
      cs.state = $scope.State.CONNECTING;
      cs.streams = playStreams(station.streamurl);

      $scope.popups.showExclusive(self.Popups.CONNECTING, 1500);
    }

    $scope.playingStarted = function() {
      var cs = $scope.currentStation;

      cs.state = $scope.State.PLAYING;

      if (isGa) ga('send', 'event', 'Playback', 'started', cs.station.name); // jshint ignore:line

      if (!cs.wasPlayed) {
        StatSvc.stationPlayed(cs.station);
        $scope.$broadcast($scope.Events.PLAYING_STARTED);
        cs.wasPlayed = true;
      }
    };
    
    $scope.playingError = function() {
      var cs = $scope.currentStation;

      if (isGa) ga('send', 'event', 'Playback', 'error', cs.station.name); // jshint ignore:line

      cs.state = $scope.State.ERROR;
      cs.streams = null;
      $scope.popups.showExclusive(self.Popups.ALERT);
    };
    
    $scope.playingStalled = function() {
      var cs = $scope.currentStation;

      if (isGa) ga('send', 'event', 'Playback', 'stalled', cs.station.name); // jshint ignore:line

      cs.state = $scope.State.CONNECTING;
    };
    
    $scope.playingResumed = function() {
      var cs = $scope.currentStation;

      if (isGa) ga('send', 'event', 'Playback', 'resumed', cs.station.name); // jshint ignore:line

      cs.state = $scope.State.PLAYING;
    };
    
    $scope.play = function(station) {
      playOrStop(station);
    };
    
    $scope.stationCss = function() {
      var classes = [];
      if (this.station.status === 0) {
        classes.push('disabled');
      }
      var cs = $scope.currentStation;
      if (cs.station && cs.station.id === this.station.id) {
        if (cs.state === $scope.State.PLAYING) {
          classes.push('playing');
        } else if (cs.state === $scope.State.CONNECTING) {
          classes.push('connecting');
        } else if (cs.state === $scope.State.ERROR) {
          classes.push('error');
        }
      }
      return classes.join(' ');
    };
    
    $scope.stateCss = function() {
      var classes = [];
      var cs = $scope.currentStation;
      if (cs.state === $scope.State.PLAYING) {
        classes.push('playing');
      } else if (cs.state === $scope.State.CONNECTING) {
        classes.push('connecting');
      } else if (cs.state === $scope.State.STOPPED && cs.station) {
        classes.push('stopped');
      } else if (cs.state === $scope.State.ERROR) {
        classes.push('error');
      }
      return classes.join(' ');
    };

  });
