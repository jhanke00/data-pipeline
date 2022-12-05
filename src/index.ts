import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { to } from 'await-to-js';
import { MongoClient } from 'mongodb';
import { readInputsFromFolder, transformInput } from '@/utils/input';
import { uploadData } from '@/utils/mongodb';
import { Output } from '@/types';

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;
const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const run = async () => {
  try {
    console.log('Connecting to client...');
    const [connectError] = await to(client.connect());
    if (connectError) {
      throw new Error(`Failed to connect: ${connectError}`);
    }

    const [pingErr] = await to(client.db('admin').command({ ping: 1 }));
    if (pingErr) {
      throw new Error(`Failed to ping client: ${pingErr}`);
    }

    console.log('Successfully connected to MongoDB');

    const database = client.db('test_project');
    const collection = database.collection<Output>('jeffrey_hanke');

    console.log('Uploading data...');

    const folderPath = path.resolve(process.cwd(), 'data');
    const [readErr, inputs] = await to(readInputsFromFolder(folderPath));
    if (readErr) {
      throw readErr;
    }

    const data = inputs.flatMap(transformInput);
    const [uploadErr, numDocs] = await to(uploadData(collection, data));
    if (uploadErr) {
      throw uploadErr;
    }

    console.log(`Successfully uploaded ${numDocs} documents`);
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Closing client connection...');
    await client.close();
    console.log('Closed connection');
  }
};

run();
