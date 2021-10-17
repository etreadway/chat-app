const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const PORT = process.env.port || 5001;

app.get("/", (req, res) => {
  res.send("<h1>HEY!!! YOU SHOULDN'T BE HERE!!!</h1>");
});

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.send("hello from server");

  socket.on("newMessage", (msg) => {
    console.log(msg);
    //use broadcast to send to all but author
    //id prevents bug with not receiving repeat messages
    socket.broadcast.emit("incoming", { id: Math.random(), message: msg });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
