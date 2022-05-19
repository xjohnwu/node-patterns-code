// https://www.yld.io/blog/streams-readable-writable-transform-flow-control/
var Thermometer = require("./thermometer");

var thermomether = new Thermometer();

thermomether.on("data", function (temp) {
  console.log("temp:", temp);
});
