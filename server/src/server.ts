import { app, connectDB } from "./app";

const PORT = process.env.PORT || 5000;

// Connetti al DB e avvia il server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
