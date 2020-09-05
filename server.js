import express from 'express';
import Messages from './dbMessages.js';
import './db/index.js';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// });

// API routes
app.get('/', (req, res) => {
  res.status(200).send('I am alive!');
});

app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find({}, {_id: 0}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(data);
  });
});

app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New messages created: \n ${data}`);
    }
  });
});

// listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
