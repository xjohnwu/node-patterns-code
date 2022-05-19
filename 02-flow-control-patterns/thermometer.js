// https://www.yld.io/blog/streams-readable-writable-transform-flow-control/
var Readable = require("stream").Readable;

function getTemperatureReadingFromThermometer(cb) {
  setTimeout(() => {
    cb(null, Math.random() * 20);
  }, 10);
}

class Thermometer extends Readable {
  constructor(options) {
    if (!options) options = {};
    options.objectMode = true;
    super(options);
  }

  _read() {
    getTemperatureReadingFromThermometer((err, temperature) => {
      if (err) this.emit("error", err);
      else {
        console.log("push", temperature);
        this.push(temperature);
      }
    });
  }
}

module.exports = Thermometer;
