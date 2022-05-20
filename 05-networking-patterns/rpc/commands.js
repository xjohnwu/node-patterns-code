// https://www.yld.io/blog/turning-a-stream-into-an-rpc-channel/
var commands = exports;

commands.setTargetTemperature = randomTimeout(null, 'command accepted, target temperature set');
commands.defrost = randomTimeout(null, 'command accepted, defrosting');
commands.powerOn = randomTimeout(null, 'command accepted, fridge is on now');
commands.powerOff = randomTimeout(null, 'command accepted, fridge is off now');

function randomTimeout() {
  var replyArgs = Array.prototype.slice.call(arguments);
  return function() {
    console.log('commands arguments:', arguments)
    var callback = arguments[arguments.length - 1];
    if (typeof callback == 'function') {
      var timeout = Math.floor(Math.random() * 1000);
      var args = [callback, timeout].concat(replyArgs);
      setTimeout.apply(null, args);
    }
  }
}