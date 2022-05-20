// https://www.yld.io/blog/using-an-event-emitter-common-use-and-edge-cases/

let Clock = require("./clock_emitter_composed");
let clock = new Clock();
clock.on("tic", function (t) {
  console.log("tic:", t);
});
clock.on("toc", function (t) {
  console.log("toc:", t);
});
clock.start();
// stop the clock 10 seconds after
setTimeout(() => {
  clock.stop();
}, 10e3);
