'use strict';

describe('Directive: rdPlayer', function () {

  beforeEach(module('ladioApp'));

  var element;
  var streamsElem;
  var attrs;
  
  beforeEach(function() {
    streamsElem = {
      callbacks: {},
      remove: function() {},
      bind: function(name, fn) {
        this.callbacks[name] = fn;
      }
    };
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
        return streamsElem;
      },
      append: function(childElem) {}
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

  it('should invoke error callback when all streams failed to play', 
      inject(function ($rootScope, rdPlayerDirective) {

    $rootScope.streams = ['stream1', 'stream2', 'stream3'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();
    
    var errorInvoked = false;
    $rootScope.playingError = function() {
      errorInvoked = true;
    }
    
    streamsElem.callbacks['error']();
    expect(errorInvoked).toBe(false);
    streamsElem.callbacks['error']();
    expect(errorInvoked).toBe(false);
    element[0].networkState = 3;
    streamsElem.callbacks['error']();    
    expect(errorInvoked).toBe(true);

  }));

});
