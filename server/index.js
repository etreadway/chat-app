const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const PORT = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello from express!</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
