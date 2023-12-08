
import { Currency, Wallet } from '@constants/funds';
import BigNumber from 'bignumber.js';
import { Capitalization, Rates, YearInMonths } from './rates/types';

export enum Cryptocurrencies {
  'usdt' = 'USDT',
  'btc' = 'BTC',
  'eth' = 'ETH',
}

export enum StableSign {
  btc = 'BTC',
  eth = 'ETH',
  usdt = 'USDT',
}

type Payment = {
  date: string; // ex: 19-02-2020
  month_income: string;
  rest: string;
  isPaid: boolean;
};

export type Stable = {
  id: number;
  balance: string; // текущий баланс
  base_amount: string; // сколько задепозитили
  total_amount: string; // ожидаемая сумма на окончание срока
  income: string; // чистый доход (total_amount - base_amount)
  term: number; // срок (кол-во месяцев)
  title?: string;
  createdAt: string; // ex: 2021-02-19T20:42:49.023Z
  date_end: string; // ex: 2021-02-19T20:42:49.023Z
  is_capitalization: boolean;
  is_ended: boolean;
  is_self_ended: boolean;
  paymentChart: Payment[];
  is_promo: boolean;
  promotion?: string;

  amount: string;
  deposit_amount: string;
  total_payout: string;
  index: number;
  month_income_amount: string;
  month_income: string;
  currency: Currency;
};

// Dto - data transfer object - общепринятое обозначение

export type StableCreateDto = {
  title: string;
  term: YearInMonths;
  amount: BigNumber;
  is_capitalization: Capitalization;
  partner_email: string;
  currency: Currency;
};
type TRates = {
  rates: Rates;
}
export type CalculationData = Pick<StableCreateDto, 'amount' | 'term' | 'currency' | 'is_capitalization'> & TRates;

export type StableSchedule = {
  date: string | Date | number;
  monthIncome: BigNumber;
  rest: BigNumber;
};