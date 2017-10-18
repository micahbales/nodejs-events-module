const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

/* When we use `emitter.on()` to attach callbacks to a listener, that
callback will be invoked every single time the event is emitted. */

const emitter4Ever = new MyEmitter();

let m = 0;

emitter4Ever.on('event', () => {
  console.log(++m);
});

emitter4Ever.emit('event');
// Prints: 1
emitter4Ever.emit('event');
// Prints: 2

/* Using `emitter.once()` has a different effect.
The callback is invoked only one time */

const oneTimeEmitter = new MyEmitter();

let m = 0;

oneTimeEmitter.once('event', () => {
  console.log(++m);
});

oneTimeEmitter.emit('event');
// Prints: 1
oneTimeEmitter.emit('event');
// Ignored
