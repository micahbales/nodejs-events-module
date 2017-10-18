const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const usuallySynchronousEmitter = new MyEmitter();

usuallySynchronousEmitter.on('event', (a, b) => {

  /* Remember the Event Loop? `setImmediate()` causes the function to
     fire in the Check phase, right after polling. It just keeps on
     trucking while the Event Loop continues. */

  setImmediate(() => {
    console.log('wow, this callback happens asynchronously!');
  });

});

usuallySynchronousEmitter.emit('event', 'a', 'b');
