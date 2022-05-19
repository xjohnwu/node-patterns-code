// https://www.yld.io/blog/using-an-event-emitter-common-use-and-edge-cases/

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('beep', function() {
  console.log('beep');
});

emitter.on('beep', function() {
  console.log('beep again');
});


console.log('before emit');

emitter.emit('beep');

console.log('after emit');