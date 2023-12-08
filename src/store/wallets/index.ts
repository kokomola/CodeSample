import { defaultAccounts } from './constants';
import {
  attach,
  combine,
  createEffect,
  createStore,
  Effect,
  Event,
  Store,
} from 'effector';
import { AppDomain } from '@store/app';
import { $fund } from '@store/account/fund';
import { AxiosRequestParams } from '@store/api';
import {
  Accounts,
  AccountWallet,
  Fund,
  Wallet,
} from '@store/wallets/types';
import { AxiosResponse } from 'axios';

export const POLLING_INTERVAL = 20000;

const mapFundFromData = (data: Accounts, funds: Fund[]): Wallet[] => {
  if (!data.wallets) return [];
  return funds.map((fund) => {
    const entries = data.wallets.filter((entry) => entry.fund === fund);

    const balance = data.balance.reduce(
      (acc, singleBalance) =>
        singleBalance.fund !== fund ? acc : singleBalance,
      { sum: '0', fund }
    );

    return {
      fund,
      entries,
      balance,
      incomes: [],
    };
  });
};

export const $accounts = AppDomain.createStore<Accounts>(defaultAccounts);

export const $wallets = $accounts.map((accounts) =>
  mapFundFromData(accounts, ['btc_wallet', 'eth_wallet', 'usdt_wallet'])
);
export const $savings = combine($accounts, (accounts) =>
  mapFundFromData(accounts, ['btc', 'eth', 'usdt'])
);

export const $walletsAndSavings = combine($wallets, $savings, (wallets, savings) => ([...wallets, ...savings]));

export const $walletByFund = combine(
  $wallets,
  $fund,
  (wallets, fund) =>
    wallets.find((wallet: Wallet) => !!fund && wallet?.fund === fund) || null
);

export const $savingByFund = combine(
  $savings,
  $fund,
  (savings, fund) =>
    savings.find((saving) => !!fund && saving?.fund === fund) || null
);

export const $isAccountsLoaded = createStore(false);

export const $usdtWallet = $wallets.map((wallets: any) =>
  wallets.find((wallet: Wallet) => wallet.fund === 'usdt_wallet')
);

export const $ethWallet = $wallets.map((wallets: any) =>
  wallets.find((wallet: Wallet) => wallet.fund === 'eth_wallet')
);

export const $btcWallet = $wallets.map((wallets: any) =>
  wallets.find((wallet: Wallet) => wallet.fund === 'btc_wallet')
);

export const $btcBalance = $btcWallet.map((wallet) => wallet.balance.sum);
export const $usdtBalance = $usdtWallet.map((wallet) => wallet.balance.sum);
export const $ethBalance = $ethWallet.map((wallet) => wallet.balance.sum);

export const $fundWallet = $accounts.map(({ wallets }) =>
  wallets.filter((wallet: AccountWallet) => ['btc_wallet', 'eth_wallet', 'usdt_wallet'].includes(wallet.fund))
);

export const fetchWalletsFx = createEffect<void, AxiosResponse<Accounts>>();
export const pollWalletsFx: Effect<
  void,
  AxiosResponse<Accounts>,
  Error
> = attach({
  effect: fetchWalletsFx,
});

export const startWalletsPolling: Event<AxiosRequestParams> = pollWalletsFx.prepend(
  (payload: AxiosRequestParams) => payload
);
export const stopWalletsPolling = AppDomain.createEvent();

export const delayBetweenWalletsPollsFx: Effect<
  AxiosRequestParams,
  any,
  Error
> = AppDomain.createEffect();
