import { io, Socket } from "socket.io-client";
import { useMessage } from "@/hooks/useMessage";
import { getClientId } from "./userServices";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private messageHook = useMessage();
  private clientId: string;

  private constructor() {
    this.clientId = getClientId(); // Use the same client ID from userServices
    this.connect();
    this.setupListeners();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private connect() {
    this.socket = io(SOCKET_URL);
    // Registra il client con il server
    this.socket.emit("register", this.clientId);
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("userCreated", (data) => {
      this.messageHook.showInfo(data.message);
    });

    this.socket.on("userDeleted", (data) => {
      this.messageHook.showInfo(data.message);
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getHeaders(): Record<string, string> {
    return {
      'x-client-id': this.clientId
    };
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketService;
