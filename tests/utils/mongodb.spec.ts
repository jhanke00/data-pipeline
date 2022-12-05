import { to } from 'await-to-js';
import { Output } from '@/types';
import { connectToClient, uploadData } from '@/utils/mongodb';
import { Db, MongoClient } from 'mongodb';
import mockData from '../__mocks__/mockOutputs.json';

describe('connectToClient()', () => {
  let client: MongoClient;

  beforeEach(() => {
    const { MONGO_URL } = process.env;
    client = new MongoClient(MONGO_URL || '');
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await client.close();
  });

  it('should successfully connect to client', async () => {
    const [err] = await to(connectToClient(client));

    expect(err).toBe(null);
  });

  it('throws an error when client could not connect', async () => {
    client.connect = jest.fn().mockRejectedValueOnce(new Error('Error'));

    const [err] = await to(connectToClient(client));

    expect(err?.message).toContain('Failed to connect');
  });

  it('throws an error when client admin db could not be pinged', async () => {
    client.db = jest.fn().mockImplementation(() => ({
      command: jest.fn().mockRejectedValueOnce(new Error('Error')),
    }));

    const [err] = await to(connectToClient(client));

    expect(err?.message).toContain('Failed to ping client');
  });
});

describe('uploadData()', () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    const { MONGO_URL } = process.env;
    connection = await MongoClient.connect(MONGO_URL || '');
    db = await connection.db('jest');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert many documents into database', async () => {
    const collection = db.collection<Output>('outputs');

    const [err, result] = await to(uploadData(collection, mockData));

    expect(err).toBe(null);
    expect(result).toEqual(3);
  });

  it('throws an error if there is something wrong with the data', async () => {
    const collection = db.collection<Output>('outputs');
    collection.insertMany = jest.fn().mockRejectedValue(new Error('Error'));

    const [err, result] = await to(uploadData(collection, mockData));

    expect(result).toBe(undefined);
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toContain('Failed to insert data');
  });
});
