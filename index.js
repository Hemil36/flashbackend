import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const corsOptions = {
  origin: 'https://flashcard-eight-rouge.vercel.app',
  optionsSuccessStatus: 200
};


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const credentials = (req, res, next) => {

  res.header('Access-Control-Allow-Credentials', true);

next();
}
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(credentials);
// app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/flashcards', flashcardRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
