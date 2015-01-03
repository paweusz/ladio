'use strict';

describe('Directive rdPlayer', function () {

  beforeEach(module('ladioApp'));

  var element;
  var streamsElem;
  var attrs;
  
  beforeEach(function() {
    streamsElem = {
      elems: [],
      callbacks: {},
      remove: function() {},
      bind: function(name, fn) {
        this.callbacks[name] = fn;
      }
    };
    element = {
      callbacks: {},
      0: {
        paused: true,
        load: function() {},
        play: function() {
          this.paused = false;
        },
        pause: function() {
          this.paused = true;
        },
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
      append: function(childElem) {
        streamsElem.elems.push(childElem);
      },
      attr: function(name) {
        return element.attrs[name];
      }
    };
    spyOn(element[0], 'load');
    spyOn(element[0], 'play').and.callThrough();
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

    expect(element[0].load.calls.count()).toEqual(1);
    expect(element[0].play).not.toHaveBeenCalled();

  }));

  it('should prepare streams for shoutcast', 
      inject(function ($rootScope, rdPlayerDirective) {

    $rootScope.streams = ['stream1', 'stream2/', 'stream3/;'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();
    
    expect(streamsElem.elems.length).toBe(5);
    expect(streamsElem.elems[0]).toMatch(/"stream1"/);
    expect(streamsElem.elems[1]).toMatch(/"stream1\/;"/);
    expect(streamsElem.elems[2]).toMatch(/"stream2\/"/);
    expect(streamsElem.elems[3]).toMatch(/"stream2\/;"/);
    expect(streamsElem.elems[4]).toMatch(/"stream3\/;"/);
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

    expect(element[0].load.calls.count()).toEqual(1);
    for (var i = 0; i < 3; i++) {
      element.callbacks['error']();
      expect(element[0].load.calls.count()).toEqual(i + 2);
    }
    expect($rootScope.playingError).not.toHaveBeenCalled();
    element.callbacks['error']();
    expect(element[0].load.calls.count()).toEqual(4);
    expect($rootScope.playingError.calls.count()).toEqual(1);

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
    expect(element[0].load.calls.count()).toEqual(1);
    element.callbacks['canplay']();
    element.callbacks['progress']();
    expect(element[0].play.calls.count()).toEqual(1);
    expect($rootScope.playingStarted).not.toHaveBeenCalled();
    element.callbacks['playing']();
    expect($rootScope.playingStarted.calls.count()).toEqual(1);
    
    expect($rootScope.playingStalled).not.toHaveBeenCalled();
    element.callbacks['stalled']();
    
    element.callbacks['progress']();
    expect($rootScope.playingResumed.calls.count()).toEqual(1);
    element.callbacks['progress']();
    expect($rootScope.playingResumed.calls.count()).toEqual(1);

  }));

  it('should not invoke playingResumed when wasn\'t playing yet', 
      inject(function ($rootScope, rdPlayerDirective) {
      
    $rootScope.playingStarted = jasmine.createSpy('playingStarted');
    $rootScope.playingStalled = jasmine.createSpy('playingStalled');
    $rootScope.playingResumed = jasmine.createSpy('playingResumed');
    
    $rootScope.streams = ['stream1', 'stream2', 'stream3'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    element.callbacks['progress']();
    expect($rootScope.playingStalled).not.toHaveBeenCalled();

    element.callbacks['stalled']();
    expect($rootScope.playingStalled).not.toHaveBeenCalled();

    element.callbacks['progress']();
    expect($rootScope.playingResumed).not.toHaveBeenCalled();
    element.callbacks['progress']();
    expect($rootScope.playingResumed).not.toHaveBeenCalled();

    element.callbacks['canplay']();
    expect(element[0].play.calls.count()).toEqual(1);
    expect($rootScope.playingStarted).not.toHaveBeenCalled();
    element.callbacks['playing']();
    expect($rootScope.playingStarted.calls.count()).toEqual(1);
    

  }));

  it('should not invoke playingResumed when paused', 
      inject(function ($rootScope, rdPlayerDirective) {
    $rootScope.playingStalled = jasmine.createSpy('playingStalled');
    $rootScope.playingResumed = jasmine.createSpy('playingResumed');

    $rootScope.streams = ['stream1'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    element.callbacks['canplay']();
    element.callbacks['playing']();
    element[0].pause();

    element.callbacks['stalled']();
    element.callbacks['progress']();

    expect($rootScope.playingStalled).not.toHaveBeenCalled();
    expect($rootScope.playingResumed).not.toHaveBeenCalled();
  }));
      
  it('should reconnect when playing stream has ended', 
      inject(function ($rootScope, rdPlayerDirective) {
      
    $rootScope.playingStarted = jasmine.createSpy('playingStarted');
    $rootScope.playingStalled = jasmine.createSpy('playingStalled');
    $rootScope.playingResumed = jasmine.createSpy('playingResumed');
    
    $rootScope.streams = ['stream1', 'stream2', 'stream3'];
    rdPlayerDirective[0].link($rootScope, element, attrs);
    $rootScope.$digest();

    element.callbacks['canplay']();
    element.callbacks['playing']();
    element.callbacks['stalled']();
    element.callbacks['progress']();
    expect($rootScope.playingStarted.calls.count()).toEqual(1);
    expect($rootScope.playingResumed.calls.count()).toEqual(1);
    expect($rootScope.playingStalled.calls.count()).toEqual(1);
    element.callbacks['ended']();
    expect($rootScope.playingStalled.calls.count()).toEqual(2);

    expect(element[0].load.calls.count()).toEqual(2);
    element.callbacks['canplay']();
    element.callbacks['playing']();
    expect($rootScope.playingStarted.calls.count()).toEqual(2);

  }));

});
