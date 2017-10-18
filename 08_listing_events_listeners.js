const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('foo', () => {});
myEmitter.on('bar', () => {});

const sym = Symbol('symbol');
myEmitter.on(sym, () => {});

const myEmitterEventNames = myEmitter.eventNames();

console.log(myEmitterEventNames);
// Prints: [ 'foo', 'bar', Symbol(symbol) ]



myEmitter.on('foo', () => {});

const fooListeners = myEmitter.listeners('foo');
const barListeners = myEmitter.listeners('bar');

console.log('foo:', fooListeners);
// Prints: foo: [ [Function], [Function] ]

console.log('bar:', barListeners);
// Prints: foo: bar: [ [Function] ]
