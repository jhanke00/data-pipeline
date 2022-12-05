import path from 'path';
import { Url } from '@/types';
import { to } from 'await-to-js';
import mockInput from '../__mocks__/mockInput.json';
import mockOutput from '../__mocks__/mockOutput.json';
import { unzipFile, readInputsFromFolder, transformUrl, transformInput } from '@/utils/input';
import util from 'util';

const filePath = path.resolve(process.cwd(), 'tests/__mocks__/data/mock.json.gz');
const folderPath = path.resolve(process.cwd(), 'tests/__mocks__/data');

describe('unzipFile()', () => {
  it('successfully unzips file', async () => {
    const [err, result] = await to(unzipFile(filePath));

    expect(err).toBe(null);
    expect(result).toEqual(mockInput);
  });

  it('throws an error when it fails to unzip file', async () => {
    const spy = jest.spyOn(util, 'promisify').mockImplementation(() => jest.fn().mockRejectedValue(new Error('Error')));

    const [err, result] = await to(unzipFile(filePath));

    expect(result).toBe(undefined);
    expect(err?.message).toContain('Unable to un-compress file');

    spy.mockReset();
    spy.mockRestore();
  });
});

describe('readInputsFromFolder()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('successfully fetches inputs from folder', async () => {
    const [err, result] = await to(readInputsFromFolder(folderPath));

    expect(err).toBe(null);
    expect(result).toEqual([mockInput]);
  });

  it('throws an error when it fails to fetch inputs from folder', async () => {
    const spy = jest.spyOn(util, 'promisify').mockImplementation(() => jest.fn().mockRejectedValueOnce(new Error('Error')));

    const [err, result] = await to(readInputsFromFolder(folderPath));

    expect(result).toBe(undefined);
    expect(err?.message).toContain('Unable to unzip file(s) from folder');

    spy.mockReset();
    spy.mockRestore();
  });
});

describe('transformUrl()', () => {
  it('returns transformed URL from string', () => {
    const expected: Url = {
      d: 'www.google.com',
      p: '/test/path',
      q: {
        var1: '1',
        var2: '2',
      },
      h: '#hello',
    };

    const result = transformUrl('https://www.google.com/test/path?var1=1&var2=2#hello');

    expect(result).toEqual(expected);
  });

  it('throws an error when url is not valid', () => {
    expect(() => transformUrl('notaurl')).toThrow('Invalid URL');
  });
});

describe('transformInput()', () => {
  it('returns a transformed input', () => {
    const result = transformInput(mockInput);

    expect(result).toEqual(mockOutput);
  });
});
