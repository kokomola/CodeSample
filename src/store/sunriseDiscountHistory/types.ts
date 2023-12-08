import BigNumber from 'bignumber.js';

export enum DiscountProduct {
  Smart = 'Amir Smart',
  Travel = 'Amir Travel',
  Guard = 'Amir Guard',
}

export type SunriseDiscount = {
  balance: BigNumber;
  reason: string;
  product: DiscountProduct;
  changerId: null | number;
  changeAmount: BigNumber;
  changeDate: Date;
};
