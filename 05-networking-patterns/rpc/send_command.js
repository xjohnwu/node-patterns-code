#!/usr/bin/env node

var net = require("net");
var Mux = require("mux-demux");
var dnode = require("dnode");

var hostname = process.argv[2];
var port = Number(process.argv[3]);
var args = process.argv.slice(4);
var method = args.shift();
if (!method) throw new Error("please provide a method to call");

console.log("command: %s (%j)", method, args.join(", "));

var conn = net.connect(port, hostname);

var mx = Mux(onConnection);
conn.pipe(mx).pipe(conn);

var stream = mx.createStream("rpc");

var d = dnode(undefined, { weak: false });
stream.pipe(d).pipe(stream);

d.on("remote", onRemote);

function onRemote(remote) {
  console.log('onRemote:', remote);
  // call the method
  args.push(callback);
  var fn = remote[method];
  if (!fn) throw new Error("No such method: " + method);
  console.log(args);
  fn.apply(remote, args);
  console.log("exits onRemote");
}

function callback(err, result) {
  console.log("callback:", err, result);

  if (err) throw err;
  console.log("result: %j", result);
  conn.end();
}

function onConnection(conn) {
  console.log('onConnection:', conn);
}
