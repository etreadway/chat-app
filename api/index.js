const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const { v4: uuidv4 } = require("uuid");

const PORT = process.env.port || 5001;

app.get("/", (req, res) => {
  res.send("<h1>HEY!!! YOU SHOULDN'T BE HERE!!!</h1>");
});

io.on("connection", (socket) => {
  socket.join("general");
  console.log("A user has connected");

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log("user left room " + room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.on("New Message", (msg, room) => {
    console.log(msg);
    console.log("From room: " + room);

    //id prevents bug with not receiving repeat messages
    socket.to(room).emit("incoming", { id: uuidv4(), message: msg });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
