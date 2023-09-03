import { io } from "socket.io-client";

export const socket = io("ws://localhost:3000");

const user = JSON.parse(localStorage.getItem("user") || "{}");
if (user && user.userName && user.id) {
  socket.emit("join-room", {
    roomId: user?.id,
    userId: user?.id,
    userName: user?.userName,
  });
}
