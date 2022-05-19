// https://www.yld.io/blog/using-an-event-emitter-common-use-and-edge-cases/

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('beep', function() {
  console.log('beep');
});

emitter.on('beep', function() {
  throw Error('oops!');
});

emitter.on('beep', function() {
  console.log('beep again');
});


console.log('before emit');

try {
  emitter.emit('beep');
} catch(err) {
  console.error('caught while emitting:', err.message);
}


console.log('after emit');

/*
output:

  before emit
  beep
  caught while emitting: oops!
  after emit

This is bad news. It means that, when emitting events, if one of the listeners throws,
depending on the order of the listener registration, the listener may not be notified.
This means that the event emitter is a good pattern for logically decoupling producers and consumers at the API level, 
but in practice the event producers and consumers are somewhat coupled.

*/