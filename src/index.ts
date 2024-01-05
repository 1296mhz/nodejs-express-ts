import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import taskV1Routes from './routes/v1/tasks';
import taskV2Routes from './routes/v2/tasks';
import MongooseConnect from './services/mongoose';
import logger from './services/logger';

async function main() {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 3000;
  
  app.use(express.json()); 
  app.use('/v1/tasks', taskV1Routes); // Add this line to mount the Task API routes
  app.use('/v2/tasks', taskV2Routes);
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });
  
  // Add this error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong');
  });

  await MongooseConnect();
  app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
}

main().catch(err => logger.error(err));
