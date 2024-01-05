import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import taskRoutes from './routes/v1/tasks';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/v1/tasks', taskRoutes); // Add this line to mount the Task API routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});