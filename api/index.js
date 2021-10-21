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

  socket.on("join topic", (topic) => {
    socket.join(topic);
    console.log("user joined room " + topic);
  });

  socket.on("leave topic", (topic) => {
    socket.leave(topic);
    console.log("user left room " + topic);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.on("New Message", (msg, topic) => {
    console.log(msg);
    console.log("From room: " + topic);

    //id prevents bug with not receiving repeat messages
    socket.to(topic).emit("incoming", { id: uuidv4(), message: msg });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
