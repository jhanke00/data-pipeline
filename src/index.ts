import * as dotenv from 'dotenv';
dotenv.config();

import { to } from 'await-to-js';
import { MongoClient } from 'mongodb';

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const run = async () => {
  console.log('Connecting to client...');
  const [connectError] = await to(client.connect());
  if (connectError) {
    console.error('Failed to connect', connectError);
  }

  console.log('Successfully connected to MongoDB');

  console.log('Uploading data...');

  // TODO: Upload data to MongoDB

  console.log('Successfully uploaded data');

  console.log('Closing client connection...');
  await client.close();
  console.log('Closed connection');
};

run();
