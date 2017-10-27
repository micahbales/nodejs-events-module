const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('foo', () => {});
myEmitter.on('foo', () => {});
myEmitter.on('foo', () => {});
myEmitter.on('foo', () => {});

// No problem

EventEmitter.defaultMaxListeners = 2;

myEmitter.on('foo', () => {});

// MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
// 5 foo listeners added. Use emitter.setMaxListeners() to increase limit

myEmitter.setMaxListeners(6);

myEmitter.on('foo', () => {});

// No problem
// (However, warning will still be output at the end,
// because it was triggered earlier in the process)
