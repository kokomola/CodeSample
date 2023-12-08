import { Fund } from '@constants/funds';
import { selectFund } from '@store/account/fund';
import { selectCoin } from '@store/coin-network';
import { Coin } from '@store/coin-network/types';
import { forward } from 'effector';
import { initDefaultFundAndCoin } from './index';

forward({
  from: initDefaultFundAndCoin,
  to: [
    selectCoin.prepend(() => Coin.BTC),
    selectFund.prepend(() => Fund.BtcWallet),
  ],
});
