const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const dangerousEmitter = new MyEmitter();



dangerousEmitter.emit('error', new Error('whoops!'));
// KABLOOOMM! (Node crashes)



const watchThisEmitter = new MyEmitter();

/* As a fallback, catch any 'error' event that is thrown */
process.on('uncaughtException', (err) => {
  console.error('whoops! there was an error');
});

watchThisEmitter.emit('error', new Error('whoops!'));
// Prints: whoops! there was an error



const safetyFirstEmitter = new MyEmitter();

/* Best practice: Set listeners for particular emitter instance */
safetyFirstEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});

safetyFirstEmitter.emit('error', new Error('whoops!'));
// Prints: whoops! there was an error
