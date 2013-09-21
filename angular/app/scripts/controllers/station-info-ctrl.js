'use strict';

angular.module('ladioApp')
  .controller('StationInfoCtrl', function ($scope, $log, $timeout, StreamInfoSvc) {

    var self = this;
    self.Popups = {
      DETAILS: 'StationInfoCtrl.DETAILS',
      ALERT: 'StationInfoCtrl.ALERT'
    };

    $scope.stationDetails = {
      title: null,
      titleLink: null
    };

    self.updateStationDetails = function() {
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


    $scope.showStationDetails = function() {
      if ($scope.currentStation.state === $scope.State.ERROR) {
        $scope.popups.showExclusive(self.Popups.ALERT);
      } else {
        self.updateStationDetails();
        $scope.popups.showExclusive(self.Popups.DETAILS);
      }
    };

    $scope.hideStationDetails = function() {
      $scope.popups.hideAll();
    };

    $scope.$on($scope.Events.STREAMS_CHANGED, function() {
      self.updateStationDetails();
    });

    $scope.$on($scope.Events.PLAYING_STARTED, function() {
      $scope.popups.showExclusive(self.Popups.DETAILS, 3800);
    });

  });
