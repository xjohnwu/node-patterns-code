var DbWriteStream = require("./db_write_stream");
var db = new DbWriteStream();

var Thermometer = require("./thermometer");
var thermometer = new Thermometer();

thermometer.pipe(db);

// Unpipe after 10 seconds
setTimeout(function () {
  thermometer.unpipe(db);
}, 10e3);
