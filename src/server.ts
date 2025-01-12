import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import kpiRoutes from './routes/kpi';
import errorMiddleware from './middlewares/errorMiddlewares';

dotenv.config();

const app: Application = express();

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/kpis', kpiRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));