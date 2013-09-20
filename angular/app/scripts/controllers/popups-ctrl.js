'use strict';

angular.module('ladioApp')
  .controller('PopupsCtrl', function ($scope, $timeout) {

    var popups = {};
    var prms = {};

    var module = {};
    $scope.popups = module;

    module.show = function(id, tout) {
      popups[id] = true;
      if (!!tout) {
        prms[id] = $timeout(function() {
          delete prms.id;
          module.hide(id);
        }, tout);
      }
    };

    module.hide = function(id) {
      popups[id] = false;
      delete prms.id;
    };

    module.isVisible = function(id) {
      return !!popups[id];
    };

    module.hideAll = function() {
      angular.forEach(popups, function(v, k) {
        if (v) {
          module.hide(k);
        }
      });
    };

    module.showExclusive = function(id, tout) {
      module.hideAll();
      module.show(id, tout);
    };

    module.cancelAutohide = function(id) {
      var p = prms[id];
      if (!!p) {
        $timeout.cancel(p);
        delete prms.id;
      }
    };

  });
