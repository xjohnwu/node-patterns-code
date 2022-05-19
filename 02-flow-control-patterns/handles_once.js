// https://www.yld.io/blog/using-an-event-emitter-common-use-and-edge-cases/

function closeEverything(onErr) {
  console.log("Cleaning up app.");
}

// // This will handle errors 10 times.
// process.on("uncaughtException", function (err) {
//   console.error("uncaught exception:", err.stack || err);
//   // orderly close server, resources, etc.
//   closeEverything(function (err) {
//     if (err) console.error("Error while closing everything:", err.stack || err);
//     // exit anyway
//     process.exit(1);
//   });
// });

// This will handle errors only once.
process.once("uncaughtException", function (err) {
  console.error("uncaught exception:", err.stack || err);
  // orderly close server, resources, etc.
  closeEverything(function (err) {
    if (err) console.error("Error while closing everything:", err.stack || err);
    // exit anyway
    process.exit(1);
  });
});

for (let i = 0; i < 10; i++) {
  console.log("Timeout" + i);
  setTimeout(() => {
    console.log("Error" + i);
    throw new Error("Hello world");
  }, 100);
}
