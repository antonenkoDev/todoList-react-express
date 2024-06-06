import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectMongoDB, connectPostgresDB } from './config/database';
import AppRouter from './routes';
import logger from './logger';
import errorHandler from './middlewares/errorHandler';
import * as process from 'node:process';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();

connectMongoDB();
connectPostgresDB();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Debug middleware to log CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const router = new AppRouter(app);
router.init();

// Setup Swagger
setupSwagger(app);

// Error handling middleware
app.use(errorHandler);

const port = app.get('port');
const server = app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

export default server;
