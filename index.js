import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const corsOptions = {
  origin: (origin, callback) => {
      if (origin === 'https://flashcard-48vrfoeie-hemil36s-projects.vercel.app/' || !origin) {
          callback(null, true);
      }
      optionsSuccessStatus: 200

  }
}

const credentials = (req, res, next) => {

  res.header('Access-Control-Allow-Credentials', true);

next();
}
const app = express();
const port = process.env.PORT || 5000;


app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/flashcards', flashcardRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
