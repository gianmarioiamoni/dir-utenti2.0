import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { UserData, IUser } from "../interfaces/userInterfaces";

export let io: SocketIOServer;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("userCreated", (data) => {
      // Broadcast to all clients except the sender
      socket.broadcast.emit("userCreated", data);
    });

    socket.on("userDeleted", (data) => {
      // Broadcast to all clients except the sender
      socket.broadcast.emit("userDeleted", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const convertToUserData = (user: IUser): UserData => ({
  nome: user.nome,
  cognome: user.cognome,
  email: user.email,
  dataNascita: user.dataNascita.toISOString().split("T")[0],
  fotoProfilo: user.fotoProfilo,
});

export const notifyUserCreated = (user: IUser) => {
  if (!io) return;
  const userData = convertToUserData(user);
  io.emit("userCreated", {
    message: `Nuovo utente creato: ${userData.nome} ${userData.cognome}`,
    user: userData,
  });
};

export const notifyUserDeleted = (user: IUser) => {
  if (!io) return;
  const userData = convertToUserData(user);
  io.emit("userDeleted", {
    message: `Utente eliminato: ${userData.nome} ${userData.cognome}`,
    user: userData,
  });
};
