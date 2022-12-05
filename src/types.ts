export type Input = {
  ts: number;
  u: string;
  e: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type QueryParams = {
  [key: string]: string;
};

export type Url = {
  d: string;
  p: string;
  q: QueryParams;
  h: string;
};

export type Output = {
  ts: number;
  u: Url;
  ec: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
