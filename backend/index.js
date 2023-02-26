require("dotenv").config();
const express = require("express");
const connectToDB = require("./configs/DB.config");
const routes = require("./routes/index.routes");
const cors = require("cors");
const app = express();

connectToDB();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`The server is listening on port ${port}...`);
});

// socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("User joined room" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageRecived) => {
    let chat = newMessageRecived.chat;

    if (!chat.users) return console.log("User chat not defined.");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecived.sender._id) return;

      socket.in(user._id).emit("message-recieved", newMessageRecived);
      s;
    });
  });
});
