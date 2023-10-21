import express, { response } from 'express';
import { db } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRouter from './routes/taskRoutes.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use('/tasks', taskRouter);

mongoose.connect(db).then(() => {
    app.listen(3001, () => {
        console.log('App is listening to port: 3001');
    });
}).catch((error) => console.log(error));