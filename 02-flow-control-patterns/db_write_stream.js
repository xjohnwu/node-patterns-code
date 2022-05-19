// https://www.yld.io/blog/streams-readable-writable-transform-flow-control/
var Writable = require("stream").Writable;

function insertIntoDatabase(doc, cb) {
  console.log("Writen to DB", doc);
  setTimeout(cb, 10);
}
class DatabaseWriteStream extends Writable {
  constructor(options) {
    if (!options) options = {};
    options.objectMode = true;
    super(options);
  }

  _write(doc, encoding, callback) {
    insertIntoDatabase(JSON.stringify(doc), callback);
  }
}

module.exports = DatabaseWriteStream;
