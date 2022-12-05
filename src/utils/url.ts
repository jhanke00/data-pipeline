import { URL } from 'url';
import { QueryParams } from '@/types';

/**
 *
 * Validate URL string
 *
 * @param url URL string to validate
 * @returns True if valid URL else false
 */
export const isValidURL = (url: string): boolean => {
  try {
    return !!new URL(url);
  } catch (e) {
    return false;
  }
};

/**
 *
 * Parses query param string into an object
 *
 * @param query Query param string
 * @returns Parsed query param object
 */
export const parseQueryParams = (query: string): QueryParams => {
  if (!query.startsWith('?')) {
    return {};
  }

  const queryParams = query.slice(1).split('&');

  return queryParams.reduce((acc: QueryParams, queryParam) => {
    const [param, val] = queryParam.split('=');
    acc[param] = val;

    return acc;
  }, {});
};
