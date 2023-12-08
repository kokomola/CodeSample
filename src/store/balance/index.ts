import { combine } from 'effector';
import { bn } from '@utils/numbers/bn';

import { Fund, getFundEnum } from '@constants/funds';
import { getCoin } from '@store/coin-network/types';
import { $purchasedTokens } from '@store/tokenSaleWallet';
import { $accounts } from '@store/wallets';
import { Balance, FUND_BALANCES } from './types';

export const $accountBalances = $accounts.map((accounts) =>
  FUND_BALANCES.map((defaultBalance) => {
    const balance = accounts.balance.find(
      ({ fund }) => fund === defaultBalance.fund,
    );
    const sum = balance?.sum;
    const fund = balance?.fund;
    return {
      ...defaultBalance,
      ...(sum && { sum: bn(sum) }),
      ...(fund && { fund: getFundEnum(fund) }),
    } as Balance;
  }),
);

export const $tokenBalances = $purchasedTokens.map((purchasedTokens) =>
  purchasedTokens.map(({ balance, token }) => {
    const coin = getCoin(token.code);
    return {
      id: token.id,
      sum: bn(balance),
      token: token.code,
      coin,
    } as Balance;
  }),
);

export const $balances = combine(
  $accountBalances,
  $tokenBalances,
  (accountBalances, tokenBalances) => [...accountBalances, ...tokenBalances],
);
