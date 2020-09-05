// DB Config
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Pusher from 'pusher';

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pw = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const options = process.env.DB_OPTIONS;
const con_url = `mongodb+srv://${user}:${pw}@${host}/${db_name}${options}`;
// const con_url = `mongodb+srv://apacheJP:ZIRVYbQ4m6TLAsuH@cluster0.wwfdr.gcp.mongodb.net/whatsapp?retryWrites=true&w=majority`;

const pusher = new Pusher({
  appId: '1067240',
  key: 'a26cdf4116a20abcb492',
  secret: '961f4dce3f789d6dd747',
  cluster: 'ap3',
  useTLS: true,
});

mongoose.connect(con_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB Connected');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log('There was a change: ', change);

    if (change.operationType == 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});
