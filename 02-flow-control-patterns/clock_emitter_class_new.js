// https://www.yld.io/blog/using-an-event-emitter-common-use-and-edge-cases/

var EventEmitter = require("events").EventEmitter;

class Clock extends EventEmitter {
  constructor() {
    super();
    this._started = false;
  }

  start() {
    if (this._started) return;

    var tic = true;

    this._started = Date.now();

    this._interval = setInterval(() => {
      var event = tic ? "tic" : "toc";
      this.emit(event, this.time());
      tic = !tic;
    }, 1000);
  }

  stop() {
    clearInterval(this._interval);
    this._started = false;
  }

  time() {
    return this._started && Date.now() - this._started;
  }
}

module.exports = Clock