var DbWriteStream = require('../db_write_stream');
var db = new DbWriteStream();

var JSONEncodeStream = require('./json_encode_stream');
var json = new JSONEncodeStream();

var ToTimestampedDocumentStream = require('./to_timestamped_document_stream');
var doc = new ToTimestampedDocumentStream();

var Thermometer = require('../thermometer');

var thermometer = new Thermometer();

thermometer.pipe(doc).pipe(json).pipe(db);
