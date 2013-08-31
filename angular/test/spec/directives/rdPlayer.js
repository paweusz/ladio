'use strict';

describe('Directive: rdPlayer', function () {

  beforeEach(module('ladioApp'));

  var element;
  var attrs;
  
  beforeEach(function() {
    element = {
      callbacks: {},
      0: {
        loadCalled: false,
        load: function() {
          this.loadCalled = true;
        }
      },
      bind: function(name, fn) {
        this.callbacks[name] = fn;
      },
      children: function() {
        return {
          remove: function() {},
          bind: function() {}
        }
      }
    };
    attrs = {
      rdPlayer: "streams",
      onplayingstarted: "playingStarted()",
      onplayingerror: "playingError()",
      onplayingstalled: "playingStalled()",
      onplayingresumed: "playingResumed()",
      maxreconnects: "3"
    };
  });
  
  it('should reset buffer to empty if no streams are provided', 
      inject(function ($rootScope, rdPlayerDirective) {

    $rootScope.streams = [];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    expect(element[0].loadCalled).toBe(true);

  }));
});
