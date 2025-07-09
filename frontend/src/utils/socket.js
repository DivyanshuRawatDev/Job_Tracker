import { io } from "socket.io-client";

const socket = io("https://job-tracker-zulr.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
 
});

export const joinRoom = (conversationID) => {
  socket.emit("joinRoom", { roomID: conversationID });
};

export default socket;
