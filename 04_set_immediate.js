// Events are called synchronously
// Callbacks are async

var EventEmitter = require('events');
var util = require('util');

function MyThing() {
  EventEmitter.call(this);

  doFirstThing();
  this.emit('thing1');
}
util.inherits(MyThing, EventEmitter);

var mt = new MyThing();

mt.on('thing1', function onThing1() {
  console.log('Sorry, never going to happen.');
});



var EventEmitter = require('events');
var util = require('util');

function MyThing() {
  EventEmitter.call(this);

  doFirstThing();
  // do this in the 'check' phase instead
  setImmediate(emitThing1, this);
}
util.inherits(MyThing, EventEmitter);

function emitThing1(self) {
  self.emit('thing1');
}

var mt = new MyThing();

mt.on('thing1', function onThing1() {
  console.log('woohoo!');
});
