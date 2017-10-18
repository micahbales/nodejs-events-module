const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();



const govtAgency = function() {
  console.log("It was just an experimental rocket.");
};
const credulousTrekkie = function() {
  console.log("Totally saw it, too!");
};
const blackHelicopter = function() {
  console.log("Womp womp womp womp womp...")
};



myEmitter.on('ufo', govtAgency);
myEmitter.on('ufo', credulousTrekkie);
myEmitter.on('ufo', blackHelicopter);



myEmitter.emit('ufo');
// Prints: "It was just an experimental rocket."
// Prints: "Totally saw it, too!"
// Prints: "Womp womp womp womp womp..."



myEmitter.removeListener('ufo', credulousTrekkie);

myEmitter.emit('ufo');
// Prints: "It was just an experimental rocket."
// Prints: "Womp womp womp womp womp..."



myEmitter.removeAllListeners('ufo');

myEmitter.emit('ufo');
// Silence
