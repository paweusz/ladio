'use strict';

angular.module('ladioApp')
  .controller('StationInfoCtrl', function ($scope, $log, StreamInfoSvc) {

    $scope.stationDetails = {
      title: null,
      titleLink: null
    };

    $scope.updateStationDetails = function() {
      if (!$scope.currentStation.streams) {
        $scope.stationDetails.title = '';
        $scope.stationDetails.titleLink = '';
        return;
      }

      $scope.stationDetails = {
        title: null,
        titleLink: null
      };

      var streamUrl = $scope.currentStation.streams[0];
      var rsp = StreamInfoSvc.getStreamInfo(streamUrl);
      rsp.success(function(streamInfo) {
        $scope.stationDetails.title = streamInfo.title;
        $scope.stationDetails.titleLink = 'http://www.google.com/search?q=' + encodeURIComponent(streamInfo.title);
      }).error(function(data, status) {
        $log.error('Error fetching station details data. (' + status + ':' + data + ')');
        $scope.stationDetails.title = '';
        $scope.stationDetails.titleLink = '';
      });
    };

  });
