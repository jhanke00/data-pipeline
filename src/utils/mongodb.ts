import { Output } from '@/types';
import { Collection } from 'mongodb';
import { to } from 'await-to-js';

/**
 *
 * Uploads a list of transformed output to MongoDB
 *
 * @param collection MongoDB collection
 * @param data Array<Output>
 * @return number of documents inserted
 */
export const uploadData = async (
  collection: Collection<Output>,
  data: Array<Output>
) => {
  const [err, result] = await to(collection.insertMany(data));
  if (err) {
    throw new Error(`Failed to insert data: ${err}`);
  }

  return result.insertedCount;
};
