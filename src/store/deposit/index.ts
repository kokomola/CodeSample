import { combine, createEffect, createEvent } from 'effector';
import { $fundWallet } from '@store/wallets';
import { $selectedCoin, $selectedNetwork } from '@store/coin-network';
import { ADDRESSES } from './types';

export const pressCopy = createEvent<{ address: string }>();
export const pressCopyFx = createEffect<{ address: string }, void>();

export const $addresses = combine($fundWallet, (wallets) =>
  ADDRESSES.map((address) => {
    const wallet = wallets.find(
      ({ fund, type }) => fund === address.fund && type === address.type,
    )!;
    return { ...address, address: wallet?.address };
  }),
);

export const $selectedAddress = combine(
  $addresses,
  $selectedCoin,
  $selectedNetwork,
  (addresses, selectedCoin, selectedNetwork) => {
    return addresses.find(
      ({ network, coin }) =>
        network === selectedNetwork && coin === selectedCoin,
    );
  },
);

export const $networksByCoin = combine(
  $addresses,
  $selectedCoin,
  (addresses, coin) =>
    addresses
      .filter((address) => address.coin === coin)
      .map(({ network }) => network),
);

export const $emptyNetworks = $networksByCoin.map(
  (networks) => networks.length === 0,
);
