const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = process.env.port || 5001;

app.get("/", (req, res) => {
  res.send("<h1>Hello from express!</h1>");
});

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", (socket) => {
    console.log("fuck you");
  });

  socket.send("hello from server");

  socket.on("message", (greeting) => {
    console.log(greeting);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
