'use strict';

angular.module('radioApp')
  .controller('NavigationCtrl', function ($scope, $location) {

    $scope.items = [
      {label: 'Catalog', path: '/genres', currentPath: '/genres'},
      {label: 'Recent', path: '/recent', currentPath: '/recent'}
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
      console.debug('reload ' + path);
      $location.path(path);
    };

    $scope.$on('$routeChangeSuccess', function() {
      var path = $location.path();
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
