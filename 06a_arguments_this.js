const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

/* EXAMPLE 1: a standard function is passed to an event listener */

const standardFunctionEmitter = new MyEmitter();

standardFunctionEmitter.on('standard_event', function(a, b) {
  console.log(a, b, this);
  // Prints:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { standard_event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
});

standardFunctionEmitter.emit('standard_event', 'a', 'b');

/* EXAMPLE 2: an arrow function is passed to an event listener */

const wackyArrowEmitter = new MyEmitter();

wackyArrowEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});

wackyArrowEmitter.emit('event', 'a', 'b');
