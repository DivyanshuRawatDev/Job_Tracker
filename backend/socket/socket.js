const express = require("express");
const { disconnect } = require("mongoose");
const { Server } = require("socket.io");

let io;

const initilizedSocket = (server) => {
  io = new Server(server, {
    cors: {
      credentials: true,
      origin: ["http://localhost:5173", "https://job-tracker-xlbc.vercel.app"],
    },
  });

  let onlineUsers = {};

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", ({ roomID }) => {
      socket.join(roomID);
      console.log(`${socket.id} joined room: ${roomID}`);
    });

    socket.on("addUser", (userID) => {
      onlineUsers[userID] = socket.id;
      console.log("Online users:", onlineUsers);
      io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("disconnectUser", (userID) => {
      if (onlineUsers[userID]) {
        delete onlineUsers[userID];
        console.log(`User ${userID} forced offline`);
        io.emit("getOnlineUsers", onlineUsers);
      }
    });

    socket.on("typing", ({ roomID, senderID }) => {
      socket.to(roomID).emit("typing", { senderID });
    });

    socket.on("stopTyping", ({ roomID, senderID }) => {
      socket.to(roomID).emit("stopTyping", { senderID });
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.id);
    });
  });
};

const getIO = () => io;
module.exports = { initilizedSocket, getIO };
