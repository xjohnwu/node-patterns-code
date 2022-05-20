// https://www.yld.io/blog/building-a-tcp-service-using-node-js/
var extend = require("util")._extend;
var Transform = require("stream").Transform;

var defaultOptions = {
  highWaterMark: 10,
  objectMode: true,
};

class Gateway extends Transform {
  constructor(options) {
    options = extend({}, options || {});
    options = extend(options, defaultOptions);

    super(options);
  }

  _transform(event, encoding, callback) {
    if (!event.id)
      return handleError(new Error("event doesn't have an `id` field"));

    pushToQueue(event, pushed);

    function pushed(err) {
      if (err) {
        handleError(err);
      } else {
        var reply = {
          id: event.id,
          success: true,
        };

        callback(null, reply);
      }
    }

    function handleError(err) {
      var reply = {
        id: event.id,
        success: false,
        error: err.message,
      };

      callback(null, reply);
    }
  }
}

/// Fake push to queue

function pushToQueue(object, callback) {
  setTimeout(callback, Math.floor(Math.random() * 1000));
}

module.exports = Gateway;
