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
        load: function() {},
        play: function() {},
        error: {
          code: 3
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
    spyOn(element[0], 'load');
    spyOn(element[0], 'play');
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

    expect(element[0].load.calls.length).toEqual(1);
    expect(element[0].play).not.toHaveBeenCalled();

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

  it('should reconnect on error', 
      inject(function ($rootScope, rdPlayerDirective) {
      
    $rootScope.playingError = jasmine.createSpy('playingError');
    
    $rootScope.streams = ['stream1', 'stream2', 'stream3'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    expect(element[0].load.calls.length).toEqual(1);
    for (var i = 0; i < 3; i++) {
      element.callbacks['error']();
      expect(element[0].load.calls.length).toEqual(i + 2);
    }
    expect($rootScope.playingError).not.toHaveBeenCalled();
    element.callbacks['error']();
    expect(element[0].load.calls.length).toEqual(4);
    expect($rootScope.playingError.calls.length).toEqual(1);

  }));

  it('should handle stalled streams', 
      inject(function ($rootScope, rdPlayerDirective) {
      
    $rootScope.playingStarted = jasmine.createSpy('playingStarted');
    $rootScope.playingStalled = jasmine.createSpy('playingStalled');
    $rootScope.playingResumed = jasmine.createSpy('playingResumed');
    
    $rootScope.streams = ['stream1', 'stream2', 'stream3'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    element.callbacks['progress']();
    expect(element[0].load.calls.length).toEqual(1);
    element.callbacks['canplay']();
    element.callbacks['progress']();
    expect(element[0].play.calls.length).toEqual(1);
    expect($rootScope.playingStarted).not.toHaveBeenCalled();
    element.callbacks['playing']();
    expect($rootScope.playingStarted.calls.length).toEqual(1);
    
    expect($rootScope.playingStalled).not.toHaveBeenCalled();
    element.callbacks['stalled']();
    
    element.callbacks['progress']();
    expect($rootScope.playingResumed.calls.length).toEqual(1);
    element.callbacks['progress']();
    expect($rootScope.playingResumed.calls.length).toEqual(1);

  }));

});
