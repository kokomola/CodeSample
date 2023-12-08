export enum Coin {
  BTC = 'btc',
  ETH = 'eth',
  USDT = 'usdt',
  USDC = 'usdc',
  BUSD = 'busd',
  AWT = 'awt',
}

export const getCoin = (data: string) =>
  Object.values(Coin).find((coin) =>
    [data, data.toLowerCase(), data.toLocaleUpperCase()].includes(coin),
  ) || null;
export const isCoin = (data: string) =>
  Object.values(Coin).includes(data as Coin);

export enum Network {
  btc = 'btc',
  eth = 'eth',
  erc20 = 'erc20',
  trc20 = 'trc20',
  bep20 = 'bep20',
}

// constants

export const DefaultNetwork = {
  [Coin.BTC]: Network.btc,
  [Coin.ETH]: Network.eth,
  [Coin.USDT]: Network.erc20,
  [Coin.USDC]: Network.bep20,
  [Coin.BUSD]: Network.bep20,
  [Coin.AWT]: Network.bep20,
};

export const SHOW_COINS = {
  [Coin.BTC]: [Coin.BTC],
  [Coin.ETH]: [Coin.ETH],
  [Coin.USDT]: [Coin.USDT, Coin.USDC],
  [Coin.BUSD]: [Coin.USDT, Coin.BUSD, Coin.USDC],
  [Coin.USDC]: [Coin.USDT, Coin.USDC],
  [Coin.AWT]: [Coin.AWT],
};

// maps

export const fundToCoin = {
  btc: Coin.BTC,
  eth: Coin.ETH,
  usdt: Coin.USDT,
  eth_wallet: Coin.ETH,
  btc_wallet: Coin.BTC,
  usdt_wallet: Coin.USDT,
};

export const fullNameByCoin = {
  [Coin.BTC]: 'Bitcoin',
  [Coin.ETH]: 'Ethereum',
  [Coin.USDT]: 'Tether',
  [Coin.BUSD]: 'BUSD',
  [Coin.USDC]: 'USDC',
  [Coin.AWT]: 'AWT',
};
