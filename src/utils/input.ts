import { to } from 'await-to-js';
import { ungzip } from 'node-gzip';
import { readFileSync, readdirSync } from 'fs';
import { Input, Output, Url } from '@/types';
import { isValidURL, parseQueryParams } from '@/utils/url';
import { URL } from 'url';

/**
 *
 * Un-compress gzip file to JSON format
 *
 * @param path Gzip file path
 * @return Input JSON from file
 */
export const unzipFile = async (path: string): Promise<Input> => {
  const compressed: Buffer = readFileSync(path);
  const [err, file] = await to(ungzip(compressed));
  if (err) {
    throw new Error(`Unable to un-compress file: ${err}`);
  }

  return JSON.parse(file.toString('utf8'));
};

/**
 * Fetch and unzips input data JSON from data folder files
 *
 * @param path Folder path string
 * @return List of input JSONs
 */
export const readInputsFromFolder = async (
  path: string
): Promise<Array<Input>> => {
  const file = readdirSync(path);
  const [err, inputs] = await to(
    Promise.all(file.map((filePath) => unzipFile(`${path}/${filePath}`)))
  );
  if (err) {
    throw new Error(`Unable to unzip file(s) from folder: ${err}`);
  }

  return inputs;
};

/**
 *
 * Transform URL to its individual components
 *
 * @param url URL string
 * @return URL object
 */
export const transformUrl = (url: string): Url => {
  if (!isValidURL(url)) {
    throw new Error('Invalid URL');
  }

  const { host, pathname, search, hash } = new URL(url);

  return {
    d: host,
    p: pathname,
    q: parseQueryParams(search),
    h: hash,
  };
};

/**
 * Transform input to its individual events object
 *
 * @param input Input JSON
 * @return List of transformed individually transformed input events
 */
export const transformInput = (input: Input): Array<Output> => {
  const { ts, u, e } = input;

  return e.map((evt) => ({
    ts,
    u: transformUrl(u),
    ec: evt,
  }));
};
