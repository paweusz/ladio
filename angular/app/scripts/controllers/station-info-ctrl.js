'use strict';

angular.module('ladioApp')
  .controller('StationInfoCtrl', function ($scope, $log, StationInfoSvc) {

    $scope.stationDetails = {
      title: null
    };

    $scope.updateStationDetails = function() {
      var streamUrl = $scope.currentStation.streams[0];
      var rsp = StationInfoSvc.getStationInfo(streamUrl);
      rsp.success(function(streamInfo) {
        $scope.stationDetails.title = streamInfo.title;
      }).error(function(data, status) {
        $log.error('Error fetching station details data. (' + status + ':' + data + ')');
      });
    }

  });
