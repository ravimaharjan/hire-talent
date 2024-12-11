// /src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './feature/auth/auth.route';
import userRoutes from './feature/user/user.route';
import experienceRoutes from './feature/experience/experience.route';
import { errorHandler } from './middlewares/error';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/experience', experienceRoutes)

// Error handling middleware
app.use(errorHandler);

export default app;
