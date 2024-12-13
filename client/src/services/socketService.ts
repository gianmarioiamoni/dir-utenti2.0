import { io, Socket } from 'socket.io-client';
import { useMessage } from '@/hooks/useMessage';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private messageHook = useMessage();

  private constructor() {
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
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('userCreated', ({ message }) => {
      this.messageHook.showInfo(message);
    });

    this.socket.on('userDeleted', ({ message }) => {
      this.messageHook.showInfo(message);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default SocketService;
