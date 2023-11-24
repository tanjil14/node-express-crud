import cors from 'cors';

import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes

// app.use('api/v1/users', (req, res) => {});

const getAController = (req: Request, res: Response) => {
  res.send('Dont worry! Server is running!');
};

app.get('/', getAController);

export default app;
