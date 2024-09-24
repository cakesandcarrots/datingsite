import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authroutes.js';
import userRoutes from './routes/userroutes.js';
import matchRoutes from './routes/matchroutes.js';
import staticDataRoutes from './routes/staticdataroutes.js'
import dotenv from 'dotenv';


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/staticdata',staticDataRoutes)

export default app;