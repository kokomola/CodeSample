import BigNumber from 'bignumber.js';

export type LineOfAMonth = LineOfADay[];

export type LineOfADay = {
  date: Date;
  btc: BigNumber;
  eth: BigNumber;
  usdt: BigNumber;
  sum: BigNumber;
};

export type Point = {
  x: number;
  y: number;
  index: number;
};
