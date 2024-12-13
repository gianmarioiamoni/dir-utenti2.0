import { app, connectDB } from "./app";
import { initializeSocket } from './services/socketService';
import { createServer } from 'http';

const PORT = process.env.PORT || 5000;

// Connetti al DB e avvia il server
const startServer = async () => {
  await connectDB();
  // Create HTTP server from Express app
  const httpServer = createServer(app);
  // Inizializza Socket.IO
  initializeSocket(httpServer);
  httpServer.listen(Number(PORT), () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
