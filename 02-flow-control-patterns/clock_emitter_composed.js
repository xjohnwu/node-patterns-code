var EventEmitter = require("events").EventEmitter;

class Clock extends EventEmitter {
  constructor() {
    super();
  }
  time() {
    return this._started && Date.now() - this._started;
  }

  start() {
    if (this._started) return;

    var tic = true;

    this._started = Date.now();

    this._interval = setInterval(
      (() => {
        var event = tic ? "tic" : "toc";
        this.emit(event, this.time());
        tic = !tic;
      }).bind(this),
      1000
    );
  }

  stop() {
    clearInterval(this._interval);
    this._started = false;
  }
}

module.exports = Clock;
