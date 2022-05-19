var Transform = require("stream").Transform;

class JSONTransform extends Transform {
  constructor(options) {
    if (!options) options = {};
    options.objectMode = true;
    super(options);
  }

  _transform(temperature, encoding, callback) {
    this.push({ when: Date.now(), temperature: temperature });
    callback();
  }
}

module.exports = JSONTransform;
