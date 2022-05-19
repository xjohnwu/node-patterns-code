// https://www.yld.io/blog/streams-readable-writable-transform-flow-control/
var DbWriteStream = require('./db_write_stream');
var db = new DbWriteStream();

var Thermometer = require('./thermometer');

var thermomether = new Thermometer();

// This is a manual connection
thermomether.on('data', function(temp) {
  db.write({when: Date.now(), temperature: temp});
});