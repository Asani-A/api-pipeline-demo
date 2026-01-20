import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';                  
import path from 'path';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// We use path.join to ensure it works in both 'src' (dev) and 'dist' (prod)
const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

// Middleware
app.use(express.json());

// Serve Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount the User Routes
app.use('/users', userRoutes);

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

export default app; // Export ONLY the app, don't listen
