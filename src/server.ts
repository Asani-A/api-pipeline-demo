import app from './app';
import { connectToRabbitMQ } from './services/mqService';

// Defined at the top level, visible to everything below
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Initialize RabbitMQ before the server starts
  await connectToRabbitMQ();
  
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
};

startServer();
