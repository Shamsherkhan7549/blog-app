import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDb from './configue/connectDb.js';
import router from './routes/blogRoutes.js';

configDotenv();

const port = process.env.PORT || 3000;
const app = express();

connectDb();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));


app.use('/api', router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});