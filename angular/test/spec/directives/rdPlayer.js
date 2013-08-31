'use strict';

describe('Directive: rdPlayer', function () {
  beforeEach(module('ladioApp'));
  
  it('should reset buffer to empty if no streams are provided', 
      inject(function ($rootScope, rdPlayerDirective) {
    var streams = [];
    var scope = $rootScope;
    var element = {
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
    var attrs = {
      rdPlayer: streams,
      onplayingstarted: "playingStarted()",
      onplayingerror: "playingError()",
      onplayingstalled: "playingStalled()",
      onplayingresumed: "playingResumed()",
      maxreconnects: "3"
    };
    
    rdPlayerDirective[0].link(scope, element, attrs);

    $rootScope.$digest();
    
    expect(element[0].loadCalled).toBe(true);
  }));
});
