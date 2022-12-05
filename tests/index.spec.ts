import path from 'path';
import { run } from '@/index';
import { MongoClient } from 'mongodb';

describe('run()', () => {
  let client: MongoClient;

  beforeEach(() => {
    const { MONGO_URL } = process.env;
    client = new MongoClient(MONGO_URL || '');

    process.cwd = jest.fn().mockReturnValue(path.resolve(__dirname, '../tests/__mocks__'));
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await client.close();
  });

  it('successfully uploads data to MongoDB', async () => {
    await run(client);

    expect(console.log).toHaveBeenCalledWith('Successfully uploaded 1 document(s)!');
  });

  it('logs errors that may have occurred during uploads', async () => {
    client.connect = jest.fn().mockRejectedValueOnce('Error');

    await run(client);

    expect(console.error).toHaveBeenCalled();
    expect(console.error).toBeCalledWith(new Error('Failed to connect: Error'));
  });
});
