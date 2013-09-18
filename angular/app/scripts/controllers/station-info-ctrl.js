'use strict';

angular.module('ladioApp')
  .controller('StationInfoCtrl', function ($scope, $log, StreamInfoSvc) {

    $scope.stationDetails = {
      title: null,
      titleLink: null
    };

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
    $scope.showStationDetails = function() {
      if ($scope.alertVisible) {
        return;
      }

      self.updateStationDetails();
      $scope.infoDetailsVisible = true;
    };

    $scope.hideStationDetails = function() {
      $scope.infoDetailsVisible = false;
    };

  });
