import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { DB_URL, PORT } from "./config/init.config.js";
import connectDB from "./config/db.config.js";
import apiRoutes from './route/api.route.js'
import createMessageService from "./service/chatService/createMessage.service.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chatapp-puce-six.vercel.app/"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

connectDB(DB_URL)
app.use(apiRoutes)

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    const created = await createMessageService(data)
    if(created) {
      socket.broadcast.emit("receive_message", created);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});