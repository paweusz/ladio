'use strict';

angular.module('ladioApp')
  .controller('StationInfoCtrl', function ($scope, $log, $timeout, StreamInfoSvc) {

    $scope.stationDetails = {
      title: null,
      titleLink: null
    };
    $scope.infoDetailsVisible = false;
    this.blinkPrms = null;

    this.updateStationDetails = function() {
      if (!$scope.currentStation.streams) {
        $scope.stationDetails.title = 'Unknown';
        $scope.stationDetails.titleLink = '';
        return;
      }

      $scope.stationDetails = {
        title: null,
        titleLink: null
      };

      var rsp = StreamInfoSvc.getStreamInfo($scope.currentStation.streams);
      rsp.success(function(streamInfo) {
        $scope.stationDetails.title = streamInfo.title;
        $scope.stationDetails.titleLink = 'http://www.google.com/search?q=' + encodeURIComponent(streamInfo.title);
      }).error(function(data, status) {
        $log.error('Error fetching station details data. (' + status + ':' + data + ')');
        $scope.stationDetails.title = 'Unknown';
        $scope.stationDetails.titleLink = '';
      });
    };

    var self = this;

    this.blinkPopup = function() {
      $scope.infoDetailsVisible = true;
      self.blinkPrms = $timeout(function() {
        self.blinkPrms = null;
        $scope.hideStationDetails();
      }, 3800);
    };

    this.cancelBlinkIfAny = function() {
      if (!!self.blinkPrms) {
        $timeout.cancel(self.blinkPrms);
        self.blinkPrms = null;
      }
    };

    $scope.showStationDetails = function() {
      self.cancelBlinkIfAny();
      if ($scope.alertVisible) {
        return;
      }

      self.updateStationDetails();
      $scope.infoDetailsVisible = true;
    };

    $scope.hideStationDetails = function() {
      $scope.infoDetailsVisible = false;
    };

    $scope.$on($scope.Events.STREAMS_CHANGED, function() {
      self.updateStationDetails();
    });

    $scope.$on($scope.Events.PLAYING_STARTED, function() {
      self.blinkPopup();
    });

    $scope.$on($scope.Events.HIDE_POPUPS_REQ, function() {
      self.cancelBlinkIfAny();
      $scope.hideStationDetails();
    });

  });
