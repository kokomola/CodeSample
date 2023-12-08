import { Coin, Network } from '@store/coin-network/types';

export const mapFundToType = {
  btc: 'bitcoin',
  eth: 'ethereum',
  usdt: 'usdt',
  eth_wallet: 'ethereum',
  btc_wallet: 'bitcoin',
  usdt_wallet: 'usdt',
};

export const walletsKeys = ['eth_wallet', 'btc_wallet', 'usdt_wallet'];
export const savingKeys = ['eth', 'btc', 'usdt'];

// enums

export enum Account {
  Wallet = 'wallet',
  Savings = 'savings',
}

export enum Wallet {
  btc = 'btc_wallet',
  eth = 'eth_wallet',
  usdt = 'usdt_wallet',
}

export enum Savings {
  btc = 'btc',
  eth = 'eth',
  usdt = 'usdt',
}

export const isWallet = (fund: string) =>
  Object.values(Wallet).includes(fund as Wallet);

export const isSavings = (fund: string) =>
  Object.values(Savings).includes(fund as Savings);

export const isFund = (fund: string) =>
  Object.values(Fund).includes(fund as Fund);

export const getAccount = (fund: Fund) =>
  isWallet(fund) ? Account.Wallet : isSavings(fund) ? Account.Savings : null;

export enum Fund {
  BtcWallet = 'btc_wallet',
  EthWallet = 'eth_wallet',
  UsdtWallet = 'usdt_wallet',
  BtcSaving = 'btc',
  EthSaving = 'eth',
  UsdtSaving = 'usdt',
}

export const getFundWalletKeys = Object.values(Wallet);
export const getFundSavingsKeys = Object.values(Savings);

export const getFundEnum = (fundToSearch: string) =>
  Object.values(Fund).find((fund) => fundToSearch === fund);

export enum StableWallet {
  Btc = 'btc_wallet',
  Eth = 'eth_wallet',
  Usdt = 'usdt_wallet',
}

//TODO Currency like lowcase
export enum Currency {
  BTC = 'btc',
  ETH = 'eth',
  USDT = 'usdt',
  SOL = 'sol',
  //SGC = 'sgc'
}
export const getCurrency = (data: string) =>
  Object.values(Currency).find((currency) =>
    [data, data.toLowerCase(), data.toLocaleUpperCase()].includes(currency)
  );

export enum Token {
  AWT = 'awt',
}

export const ExtendedCurrency = {
  ...Currency,
  ...Token,
};

export const Sign = {
  [Coin.BTC]: 'BTC',
  [Coin.ETH]: 'ETH',
  [Coin.USDT]: 'USDT',
  [Coin.AWT]: 'AWT',
  [Currency.SOL]: 'SGC',
  //[Currency.SGC]: 'SGC',
  [Network.erc20]: 'ERC-20',
  [Network.trc20]: 'TRC-20',
  [Network.bep20]: 'BEP-20',
  [Coin.BUSD]: 'BUSD',
  [Coin.USDC]: 'USDC',
};

export enum Blockchain {
  Btc = 'btc',
  Eth = 'eth',
  Erc20 = 'erc20',
  Trc20 = 'trc20',
  Bep20 = 'bep20',
}

// rewritten map

export const mapFundToCurrency = {
  btc: Currency.BTC,
  eth: Currency.ETH,
  usdt: Currency.USDT,
  sol: Currency.SOL,
  eth_wallet: Currency.ETH,
  btc_wallet: Currency.BTC,
  usdt_wallet: Currency.USDT,
};

// constants

export const FullFund = { Wallet, Savings };

export const mapBalancePercent = {
  [FullFund.Wallet.btc]: '0.3%',
  [FullFund.Wallet.eth]: '0.5%',
  [FullFund.Wallet.usdt]: '0.8%',
  [FullFund.Savings.btc]: '',
  [FullFund.Savings.eth]: '',
  [FullFund.Savings.usdt]: '',
};

/*export const FullFundTwo = { ...Wallet, ...Saving };
export type FullFundTwo = typeof FullFundTwo; */
