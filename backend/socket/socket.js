const express = require("express");
const { disconnect } = require("mongoose");
const { Server } = require("socket.io");

let io;

const initilizedSocket = (server) => {
  io = new Server(server, {
    cors: {
      credentials: true,
      origin: [
        "http://localhost:5173",
        "https://job-tracker-xlbc.vercel.app"
      ],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", ({roomID}) => {
      socket.join(roomID);
      console.log(`${socket.id} joined room: ${roomID}`);
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.id);
    });
  });
};

const getIO = () => io;
module.exports = { initilizedSocket, getIO };
