import { combine } from 'effector';

import { CoinSelect } from '@components/uikit/CoinSelector/types';
import { TransferDomain } from '@store/app';
import { $accountBalances, $balances } from '@store/balance';
import { $chosendAccount, $fund } from '@store/account/fund';
import { $selectedCoin } from '@store/coin-network';
import { $selectedToken } from '@store/tokenSaleWallet';
import { is } from '@utils/common/condition';
import { SELECTOR_COINS } from './types';

// account selector
export const $idx = TransferDomain.createStore<number>(0);
export const changeIdx = TransferDomain.createEvent<number>();

export const $availableTransfers = TransferDomain.createStore<string[] | null>(
  null
);
export const updateAvailableTransfers = TransferDomain.createEvent<string[]>();

export const $selectedTokenSaleId = TransferDomain.createStore<number | null>(
  null
);
export const updateSelectedTokenSaleId = TransferDomain.createEvent<number>();
export const resetTransfer = TransferDomain.createEvent();
export const redirectToTransferMenuFx = TransferDomain.createEffect();

// wallet store
export const $from = combine(
  $balances,
  $fund,
  $selectedCoin,
  $selectedToken,
  (balances, fund, coin, token) =>
    balances.find(
      (balance) =>
        (is.exist(fund) && balance.fund === fund && balance.coin === coin) ||
        (is.empty(fund) &&
          token?.token.id === balance.id &&
          token.token.code.trim() === balance.token)
    ) || null
);

export const $selectorFundCoins = combine(
  $chosendAccount,
  $accountBalances,
  (account, balances) => {
    if (!account) return [];
    return SELECTOR_COINS[account].map(
      (selector) =>
        ({
          ...selector,
          balance: balances.find(({ fund }) => fund === selector?.fund)?.sum,
        } as CoinSelect)
    );
  }
);
