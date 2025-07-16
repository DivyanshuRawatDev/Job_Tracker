import { io } from "socket.io-client";

const socket = io("https://job-tracker-zulr.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

// const socket = io("http://localhost:8080", {
//   transports: ["websocket"],
//   withCredentials: true,
// });

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

export const connectSocket = (userID) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("addUser", userID);
};

export const joinRoom = (conversationID) => {
  socket.emit("joinRoom", { roomID: conversationID });
};

export { socket };
