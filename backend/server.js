import express from "express";
import cors from 'cors'
import { Server } from "socket.io";
import http from 'http'

// const app = express()

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin : "http://localhost:5173",
//         methods : ["GET", "POST"]
//     }
// })

// let usersList = []

// io.on("connection", (socket) => {
//     console.log("User Connected", socket.id)

//     socket.on("join", (username) => {
//         if (!usersList.some((user) => user.id === socket.id)){ // if new user come added into users list
//             usersList.push({id : socket.id , name : username})
//         }

//         io.emit("users", usersList.map((user) => user.name))

//         io.emit("message", {
//             username : "System", // you can use name
//             message : `${username} is joined in the chat`
//         })
//     })

//     socket.on("sendMessage", data => {
//         io.emit("message", data)
//     })

//     socket.on("disconnect", () => {
//     const user = users.find((user) => user.id === socket.id);
//     if (user) {
//       users = users.filter((u) => u.id !== socket.id);
//       io.emit(
//         "users",
//         users.map((user) => user.username)
//       );
//       io.emit("message", {
//         username: "System",
//         message: `${user.username} has left the chat.`,
//       });
//     }
//   });
  
// })

// server.listen(5001, () => {
//     console.log("Server running on port 5001")
// })


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User Joined");

  socket.on("join", (username) => {
    if (!users.some((user) => user.id === socket.id)) {
      users.push({ id: socket.id, username });
    }
    io.emit(
      "users",
      users.map((user) => user.username)
    );
    io.emit("message", {
      username: "System",
      message: `${username} has joined the chat.`,
    });
  });

  socket.on("sendMessage", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      users = users.filter((u) => u.id !== socket.id);
      io.emit(
        "users",
        users.map((user) => user.username)
      );
      io.emit("message", {
        username: "System",
        message: `${user.username} has left the chat.`,
      });
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});