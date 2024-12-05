import { app } from "./app";
import { createServer } from "http";
import { HOST, PORT } from "./env";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", (room, num1) => {
    console.log(`==> User ${socket.id} joined room ${room}`);
    socket.join(room);
  });

  socket.on('leaveRoom', room =>{
    console.log(`==> User ${socket.id} LEFT room ${room}`);
    socket.leave(room)
  })

  socket.on("message", ({room, message}) => {
    console.log("received on server:", message);
    
    io.to(room).emit('message', {id: socket.id, message})
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Listening at http://${HOST}:${PORT}`);
});
