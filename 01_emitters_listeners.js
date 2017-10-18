const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  /* if we want to add any
     general properties/methods
     for all our emitters,
     we can do that here. */
}

// create a new instance of myEmitter
const coolEmitter = new MyEmitter();

// add event listener, 'coolAlert', with callback function
coolEmitter.on('coolAlert', () => {
  console.log('something cool happened!');
});

// emit event, 'coolAlert' (callback is fired)
coolEmitter.emit('coolAlert');
