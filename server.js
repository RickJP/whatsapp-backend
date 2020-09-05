import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares

// DB Config
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pw = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const options = process.env.DB_OPTIONS;
const con_url = `mongodb+srv://${user}:${pw}@${host}${db_name}${options}`;

mongoose.connect(
  con_url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Connected to DB successfully`);
  }
);

// ????

// API routes
app.get('/', (req, res) => {
  res.status(200).send('hello there!');
});

// listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
