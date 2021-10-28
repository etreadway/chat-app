const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const { v4: uuidv4 } = require("uuid");

const PORT = process.env.port || 5001;

// this is the current topic list. It needs to be put somewhere better.
var topicList = ["1", "2", "3", "general", "server"];

app.get("/", (req, res) => {
  res.send("<h1>HEY!!! YOU SHOULDN'T BE HERE!!!</h1>");
});

io.on("connection", (socket) => {
  socket.join("general");
  console.log("User [" + socket.id + "] has connected");

  socket.emit("new topic list", topicList);

  socket.on("request topics", () => {
    console.log(socket.nickname + " requested topics");
    socket.emit("new topic list", topicList);
  });

  socket.on("POST new topic", (newTopic) => {
    topicList = [...topicList, newTopic];

    io.emit("new topic list", topicList);
  });

  socket.on("sending username", (userName) => {
    socket.nickname = userName;
  });

  socket.on("join topic", (topic) => {
    socket.join(topic);
    console.log("user joined room " + topic);
  });

  socket.on("leave topic", (topic) => {
    socket.leave(topic);
    console.log("user left room " + topic);
  });

  socket.on("new message", (msg, topic) => {
    socket.to(topic).emit("incoming", {
      id: uuidv4(),
      userName: socket.nickname,
      message: msg,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
