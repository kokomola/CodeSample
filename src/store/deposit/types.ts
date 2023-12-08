import { Coin, Network } from '@store/coin-network/types';

export const ADDRESSES = [
  {
    id: 1,
    coin: Coin.BTC,
    network: Network.btc,
    fund: 'btc_wallet',
    type: 'bitcoin',
  },
  {
    id: 2,
    coin: Coin.ETH,
    network: Network.eth,
    fund: 'eth_wallet',
    type: 'ethereum',
  },
  // tokens
  {
    id: 3,
    coin: Coin.USDC,
    network: Network.bep20,
    fund: 'usdt_wallet',
    type: 'ethereum',
  },
  {
    id: 4,
    coin: Coin.BUSD,
    network: Network.bep20,
    fund: 'usdt_wallet',
    type: 'ethereum',
  },
  // awt
  {
    id: 5,
    coin: Coin.AWT,
    network: Network.bep20,
    fund: 'usdt_wallet',
    type: 'ethereum',
  },
  // usdt
  {
    id: 6,
    coin: Coin.USDT,
    network: Network.erc20,
    fund: 'usdt_wallet',
    type: 'ethereum',
  },
  {
    id: 7,
    coin: Coin.USDT,
    network: Network.trc20,
    fund: 'usdt_wallet',
    type: 'trx',
  },
  {
    id: 8,
    coin: Coin.USDT,
    network: Network.bep20,
    fund: 'usdt_wallet',
    type: 'ethereum',
  },
];
