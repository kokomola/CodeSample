import { Accounts } from './types';

export const defaultAccounts: Accounts = {
  balance: [],
  wallets: [
    { type: 'bitcoin', fund: 'btc', address: '' },
    { type: 'bitcoin', fund: 'btc_wallet', address: '' },
    { type: 'bitcoin', fund: 'usdt_wallet', address: '' },
    { type: 'ethereum', fund: 'eth', address: '' },
    { type: 'ethereum', fund: 'btc_wallet', address: '' },
    { type: 'ethereum', fund: 'usdt_wallet', address: '' },
    { type: 'usdt', fund: 'btc_wallet', address: '' },
    { type: 'bitcoin', fund: 'eth', address: '' },
    { type: 'bitcoin', fund: 'eth_wallet', address: '' },
    { type: 'ethereum', fund: 'btc', address: '' },
    { type: 'ethereum', fund: 'usdt', address: '' },
    { type: 'usdt', fund: 'usdt', address: '' },
    { type: 'bitcoin', fund: 'usdt', address: '' },
    { type: 'usdt', fund: 'btc', address: '' },
    { type: 'usdt', fund: 'eth_wallet', address: '' },
    { type: 'ethereum', fund: 'eth_wallet', address: '' },
    { type: 'usdt', fund: 'eth', address: '' },
    { type: 'usdt', fund: 'usdt_wallet', address: '' },
  ],
};
