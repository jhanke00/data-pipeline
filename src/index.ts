import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { MongoClient } from 'mongodb';
import { readInputsFromFolder, transformInput } from '@/utils/input';
import { connectToClient, uploadData } from '@/utils/mongodb';
import { Output } from '@/types';

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;
const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri);

export const run = async (client: MongoClient) => {
  try {
    await connectToClient(client);
    const database = client.db('test_project');
    const collection = database.collection<Output>('jeffrey_hanke');

    const folderPath = path.resolve(process.cwd(), 'data');
    const inputs = await readInputsFromFolder(folderPath);
    console.log(`Successfully read ${inputs.length} inputs.`);

    const data = inputs.flatMap(transformInput);
    const numDocs = await uploadData(collection, data);
    console.log(`Successfully uploaded ${numDocs} document(s)!`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

run(mongoClient);
