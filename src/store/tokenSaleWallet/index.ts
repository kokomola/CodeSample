import { $fund } from '@store/account/fund';
import { TokenSale } from '@store/app';
import { $accounts } from '@store/wallets';
import { Wallet } from '@store/wallets/types';
import { combine } from 'effector';

import { createGate } from 'effector-react';
import {
  OwnedTokenOperation,
  OwnedTokens,
  ResponseDoneOperations,
  ResponseDoneTokens,
} from './types';

/** fetch bought tokens from token sale offer */

export const purchasedTokensGate = createGate();

export const $selectedTokenId = TokenSale.createStore<number | null>(null);
export const selectTokenId = TokenSale.createEvent<number | null>();

export const $purchasedTokens = TokenSale.createStore<OwnedTokens[]>([]);
export const $awtToken = combine($purchasedTokens, $fund, (tokens, fund) => {
  return tokens.find(({ token }) => token.code === fund) || null;
});

export const $selectedToken = combine(
  $purchasedTokens,
  $selectedTokenId,
  (tokens, id) => tokens.find((token) => token.token.id === id)
);

export const $awtTokenWalletType = combine(
  $accounts,
  $awtToken,
  (accounts, awtToken): Wallet | null => {
    const entries = accounts.wallets
      .filter(({ fund }) => fund === 'usdt_wallet')
      .map(({ fund, type, address }) => {
        return {
          address,
          fund,
          type,
        };
      });
    if (awtToken) {
      return {
        fund: 'awt_wallet',
        entries,
        balance: {
          sum: awtToken.balance.toString(),
          fund: 'awt_wallet',
        },
        incomes: [],
      };
    }
    return null;
  }
);

export const $isOwnedTokensLoaded = TokenSale.createStore<boolean>(false);

// export const getOwnedTokens = TokenSale.createEvent();
export const fetchPurchasedTokensFx = TokenSale.createEffect<
  void,
  ResponseDoneTokens<OwnedTokens[]>
>();

/** fetch operations to specific token wallet */

export const $purchasedTokensOperations = TokenSale.createStore<
  OwnedTokenOperation[]
>([]);

export const fetchPurchasedTokensOperationsFx = TokenSale.createEffect<
  number,
  ResponseDoneOperations<OwnedTokenOperation[]>
>();

export const $sortedTokensOperations = TokenSale.createStore<
  OwnedTokenOperation[]
>([]);
