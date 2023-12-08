import { selectFundAndCoin } from '@store/account/fund';
import {
  $selectedCoin,
  $selectedNetwork,
  $showCoins,
  selectCoin,
  selectNetwork,
} from './index';

import { DefaultNetwork, getCoin, SHOW_COINS } from './types';

$selectedCoin
  .on(selectCoin, (_, coin) => coin)
  .on(selectFundAndCoin, (_, selector) => getCoin(selector?.coin || ''));

/* $selectedCoins.on(selectCoins, (_, coin) => coin); */

$showCoins.on(selectCoin, (_, coin) => (coin ? SHOW_COINS[coin] : []));

$selectedNetwork
  .on(selectCoin, (_, coin) => (coin ? DefaultNetwork[coin] : null))
  .on(selectNetwork, (_, network) => network);
