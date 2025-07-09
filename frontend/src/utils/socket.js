import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  withCredentials: true,
 
});

export const joinRoom = (conversationID) => {
  socket.emit("joinRoom", { roomID: conversationID });
};

export default socket;
