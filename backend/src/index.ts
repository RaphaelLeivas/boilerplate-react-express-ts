import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectToDatabase } from './database/connection';
import routes from './routes';
import { LogMiddleware } from './middlewares';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT;

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running at http://localhost:${port}`);
});

// utiliza o middleware em todos os endpoints, toda vez que é chamado
app.use(LogMiddleware.logPayload);

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
