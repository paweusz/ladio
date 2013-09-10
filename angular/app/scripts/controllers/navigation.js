'use strict';

angular.module('ladioApp')
  .controller('NavigationCtrl', function ($scope, $location, $log, State) {

    $scope.items = [
      {label: 'Catalog', path: '/genres', currentPath: '/genres'},
      {label: 'Recent', path: '/recent', currentPath: '/recent'},
      {label: 'Starred', path: '/starred', currentPath: '/starred'}
    ];
    
    var selectedItem = null;
    
    function select(item) {
      if (selectedItem) {
        selectedItem.css = '';
      }
      selectedItem = item;
      selectedItem.css = 'selected';
      selectedItem.currentPath = $location.path();
    }
    
    $scope.select = function(item) {
      var path = item.currentPath;
      $log.log('reload ' + path);
      $location.path(path);
    };

    $scope.$on('$routeChangeSuccess', function() {
      var path = $location.path();
      if (path === '/') {
        return;
      }
      
      State.setLastURL(path);
      
      var items = $scope.items;
      for (var i = 0; i < items.length; i++) {
        var patt = new RegExp('^' + items[i].path);
        if (patt.test(path)) {
          select(items[i]);
          break;
        }
      }
    });
    
  });
