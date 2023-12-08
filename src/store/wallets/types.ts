export type WalletFund = 'usdt_wallet' | 'eth_wallet' | 'btc_wallet';
export type SavingFund = 'usdt' | 'eth' | 'btc';
export type SolFund = 'sol';

export type AwtFund = 'awt_wallet' | 'AWT';

/**
 * @type (
 *  {WalletFund = 'usdt_wallet' | 'eth_wallet' | 'btc_wallet'} |
 *  {SavingFund = 'usdt' | 'eth' | 'btc'}
 */
export type Fund = WalletFund | SavingFund | AwtFund;
export type CryptoAccountType = 'bitcoin' | 'ethereum' | 'usdt' | 'trx';
export type SolAccountType = 'sol';

export const AccountSelectors = ['btc', 'eth', 'usdt'];

export type AccountTitle = {
  fund: Fund;
  sum: string;
};

export type AccountWallet = {
  fund: Fund;
  address: string;
  type: CryptoAccountType;
};

export type Accounts = {
  wallets: AccountWallet[];
  balance: AccountTitle[];
  orders: unknown[];
};

export type Wallet = {
  fund: Fund;
  balance: {
    sum: string;
    fund: Fund;
  };
  entries: {
    address: string;
    type: CryptoAccountType;
    fund: Fund;
  }[];
  incomes: any[];
};

export type Saving = {
  fund: SavingFund;
  balance: {
    sum: string;
    fund: SavingFund;
  };
  incomes: any[];
};

export type Account = Wallet | Saving;
