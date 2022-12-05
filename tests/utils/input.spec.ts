import path from 'path';
import { Url } from '@/types';
import { to } from 'await-to-js';
import mockInput from '../__mocks__/mockInput.json';
import mockOutput from '../__mocks__/mockOutput.json';
import {
  unzipFile,
  readInputsFromFolder,
  transformUrl,
  transformInput,
} from '@/utils/input';

describe('unzipFile()', () => {
  it('successfully unzips file', async () => {
    const filePath = path.resolve(
      process.cwd(),
      'tests/__mocks__/data/mock.json.gz'
    );

    const [err, result] = await to(unzipFile(filePath));

    expect(err).toBe(null);
    expect(result).toEqual(mockInput);
  });
});

describe('readInputsFromFolder()', () => {
  it('successfully fetches inputs from folder', async () => {
    const folderPath = path.resolve(process.cwd(), 'tests/__mocks__/data');

    const [err, result] = await to(readInputsFromFolder(folderPath));

    expect(err).toBe(null);
    expect(result).toEqual([mockInput]);
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

    const result = transformUrl(
      'https://www.google.com/test/path?var1=1&var2=2#hello'
    );

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
