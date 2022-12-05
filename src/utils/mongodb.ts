import { Output } from '@/types';
import { MongoClient } from 'mongodb';

/**
 *
 * Uploads a list of transformed output to MongoDB
 *
 * @param client MongoClient
 * @param data Array<Output>
 */
export const uploadData = (client: MongoClient, data: Array<Output>) => {
  console.log(client, data);
};
