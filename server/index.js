const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Port = 5000;
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messages');
const socket = require("socket.io");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect("mongodb://localhost/chat_users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
});

const server = app.listen(Port, () =>
  console.log(`Server started on ${Port}`)
);
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });