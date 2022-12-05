import { Output } from '@/types';
import { Collection, MongoClient } from 'mongodb';
import { to } from 'await-to-js';

/**
 *
 * Creates client connection and tests connection
 *
 * @param client MongoDB client to connect
 */
export const connectToClient = async (client: MongoClient) => {
  const [connectError] = await to(client.connect());
  if (connectError) {
    throw new Error(`Failed to connect: ${connectError}`);
  }

  const [pingErr] = await to(client.db('admin').command({ ping: 1 }));
  if (pingErr) {
    throw new Error(`Failed to ping client: ${pingErr}`);
  }
};

/**
 *
 * Uploads a list of transformed output to MongoDB
 *
 * @param collection MongoDB collection
 * @param data Array<Output>
 * @return number of documents inserted
 */
export const uploadData = async (collection: Collection<Output>, data: Array<Output>) => {
  const [err, result] = await to(collection.insertMany(data));
  if (err) {
    throw new Error(`Failed to insert data: ${err}`);
  }

  return result.insertedCount;
};
