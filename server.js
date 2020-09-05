import express from 'express';
import Messages from './dbMessages.js';
import './db/index.js';

import Pusher from 'pusher';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1067240',
  key: 'a26cdf4116a20abcb492',
  secret: '961f4dce3f789d6dd747',
  cluster: 'ap3',
  encrypted: true,
});

// middlewares
app.use(express.json());

// API routes
app.get('/', (req, res) => {
  res.status(200).send('I am alive!');
});

app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find((err, data) => {
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
