const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const alphabetEmitter = new MyEmitter();

function printString(string) {
  console.log(string);
}

alphabetEmitter.on('nowIKnowMy', function () { printString("A") });
alphabetEmitter.on('nowIKnowMy', function () { printString("B") });
alphabetEmitter.on('nowIKnowMy', function () { printString("C") });

alphabetEmitter.emit('nowIKnowMy');
// Prints: "A"
// Prints: "B"
// Prints: "C"



alphabetEmitter.prependListener('nowIKnowMy', function () { printString("Z") });

alphabetEmitter.emit('nowIKnowMy');
// Prints: "Z"
// Prints: "A"
// Prints: "B"
// Prints: "C"


alphabetEmitter.prependOnceListener('nowIKnowMy',
function() { printString("Next time won't you sing with me?") });

alphabetEmitter.emit('nowIKnowMy');
// Prints: "Next time won't you sing with me?"
// Prints: "Z"
// Prints: "A"
// Prints: "B"
// Prints: "C"

alphabetEmitter.emit('nowIKnowMy');
// Prints: "Z"
// Prints: "A"
// Prints: "B"
// Prints: "C"
