'use strict';

angular.module('ladioApp')
  .controller('PopupsCtrl', function ($scope, $timeout, StateSvc) {

    var popups = {};
    var dialogs = {};
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

    module.showDialog = function(id) {
      dialogs[id] = true;
    };

    module.hide = function(id) {
      popups[id] = false;
      delete prms.id;
    };

    module.hideDialog = function(id) {
      dialogs[id] = false;
    };

    module.isVisible = function(id) {
      return !!popups[id];
    };

    module.isDialogVisible = function(id) {
      return !!dialogs[id];
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

    module.isPrivacyAck = function() {
      return StateSvc.isPrivacyAck();
    };

    module.ackPrivacy = function() {
      StateSvc.setPrivacyAck(true);
    };

  });
