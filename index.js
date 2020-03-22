const io = require("socket.io")(4000);

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
