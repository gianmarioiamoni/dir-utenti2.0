import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { UserData, IUser } from "../interfaces/userInterfaces";

export let io: SocketIOServer;
const connectedSockets = new Map<string, Socket>();

export const initializeSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);
    
    socket.on("register", (clientId: string) => {
      console.log("Client registered:", clientId);
      connectedSockets.set(clientId, socket);
    });

    socket.on("disconnect", () => {
      // Rimuovi il socket dalla mappa quando il client si disconnette
      for (const [clientId, s] of connectedSockets.entries()) {
        if (s.id === socket.id) {
          connectedSockets.delete(clientId);
          break;
        }
      }
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const broadcastToOthers = (
  excludeClientId: string,
  event: string,
  data: any
) => {
  const senderSocket = connectedSockets.get(excludeClientId);
  if (senderSocket) {
    senderSocket.broadcast.emit(event, data);
  } else {
    // Se non troviamo il socket del sender, usiamo broadcast su tutti i socket
    io.sockets.emit(event, data);
  }
};
