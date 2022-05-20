const http = require("http");
http.get("http://localhost:8000", (res) => {
  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("close", () => {
    console.log("Retrieved all data:");
    console.log(data);
  });
});
