var Transform = require("stream").Transform;

class JSONEncode extends Transform {
  constructor(options) {
    if (!options) options = {};
    options.objectMode = true;
    super(options);
  }
  _transform(obj, encoding, callback) {
    try {
      obj = JSON.stringify(obj);
    } catch (err) {
      return callback(err);
    }

    this.push(obj);
    callback();
  }
}

module.exports = JSONEncode;
