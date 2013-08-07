'use strict';

angular.module('radioApp')
  .directive('rdAutosize', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        
        function getStylesheet() {
          var stylesheet = null;
          var sheetName = 'autoresize';
          var head = angular.element($window.document).find('head')[0];
          for (var i = 0; i < document.styleSheets.length; i++) {
            var node = document.styleSheets[i];
            if (node.title === sheetName) {
              stylesheet = node;
              break;
            }
          }
          if (stylesheet === null) {
            var newNode = document.createElement('style');
            newNode.type = 'text/css';
            newNode.rel = 'stylesheet';
            newNode.media = 'screen';
            newNode.title = sheetName;
            angular.element(head).append(newNode);
            stylesheet = document.styleSheets[document.styleSheets.length - 1];
          }
          return stylesheet;
        }
        
        function setBlockWidth(stylesheet, width) {
          if (stylesheet.cssRules.length > 0) {
            stylesheet.deleteRule(0);
          }
          stylesheet.insertRule('.station, .genre {width: ' + width + 'px;}', 0);
        }
        
        function updateSize() {
          var wndWidth = element[0].offsetWidth;
          if (wndWidth === 0) {
            return;
          }

          var blWidth = 151;
          var mod = wndWidth % blWidth;
          var blCnt = Math.floor(wndWidth / blWidth);
          var adj = Math.floor(mod / blCnt);

          console.debug('wndWidth=' + wndWidth + ', mod=' + mod +
            ', blCnt=' + blCnt + ', adj=' + adj);
          console.debug('blWidth + adj - 1 = ' + (blWidth + adj - 1));
            
          var stylesheet = getStylesheet();
          setBlockWidth(stylesheet, blWidth + adj - 1);
        }
        
        scope.$watch(attrs.rdAutosize, function() {
          console.debug('Size recalc scope');
          updateSize();
        });
        angular.element($window).bind('resize', function() {
          console.debug('Size recalc wnd');
          updateSize();
        });
      }
    };
  });
