const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io").listen(server);

server.listen(process.env.PORT || 12000, "localhost", (error) => {
  console.log(`Started server on port ${process.env.PORT || 12000}`)
});

let connectedUsers = [];

io.on("connection", socket => {
  socket.on("user", user => {
    connectedUsers.push({
      id: socket.id,
      name: user
    });
    console.log(`User connected: ${user}`);
  });

  socket.on("message", message => {
    socket.broadcast.emit("message", message);
  });
});
