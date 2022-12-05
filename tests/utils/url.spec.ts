import { QueryParams } from '@/types';
import { isValidURL, parseQueryParams } from '@/utils/url';

describe('isValidURL()', () => {
  it('should return true for a valid URL', () => {
    const result = isValidURL('https://google.com');

    expect(result).toEqual(true);
  });

  it('should return false for an invalid URL', () => {
    const result = isValidURL('google.com');

    expect(result).toEqual(false);
  });

  it('should return false if url is empty', () => {
    const result = isValidURL('');

    expect(result).toEqual(false);
  });
});

describe('parseQueryParams()', () => {
  it('should return the query param string as an object', () => {
    const expected: QueryParams = {
      var1: '1',
      var2: '2',
    };

    const result = parseQueryParams('?var1=1&var2=2');

    expect(result).toEqual(expected);
  });

  it('should return empty object if query params does not include ?', () => {
    const result = parseQueryParams('somerandomstring');

    expect(result).toEqual({});
  });

  it('should return empty object if no query params are passed', () => {
    const result = parseQueryParams('');

    expect(result).toEqual({});
  });
});
