export type Input = {
  ts: number;
  u: string;
  e: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type Output = {
  ts: number;
  u: {
    d: string;
    p: string;
    q: {
      [key: string]: string;
    };
    h: string;
  };
  ec: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
