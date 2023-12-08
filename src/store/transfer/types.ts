import { CoinSelect } from '@components/uikit/CoinSelector/types';
import { BtcIcon, EthIcon, UsdtIcon } from '@components/uikit/Icon/lib';
import { iconColors } from '@constants/colors';
import { Account, Fund } from '@constants/funds';
import { Coin } from '@store/coin-network/types';
import { bn } from '@utils/numbers/bn';

export type LeadingField = 'spent' | 'target';

export type TransferPayload = {
  amount: string;
  from_fund: Fund;
  to_fund: Fund;
  leading_field: LeadingField;
};
export type TransferByP2PPayload = {
  fund: Fund;
  to: string;
  amount: string;
  message: string;
};

export type SelectorIndex = {
  fund: Fund;
  coin: Coin.BTC | Coin.ETH | Coin.USDT;
};

export const SELECTOR_INDEXES = [Coin.BTC, Coin.ETH, Coin.USDT];

export const SELECTOR_WALLET_COINS: CoinSelect[] = [
  {
    idx: 0,
    textBeforeTitle: 'from',
    translate: 'btcWallet',
    balance: bn(0),
    SvgIcon: BtcIcon,
    color: iconColors.btc,
    fund: Fund.BtcWallet,
    coin: Coin.BTC,
  },
  {
    idx: 1,
    textBeforeTitle: 'from',
    translate: 'ethWallet',
    balance: bn(0),
    SvgIcon: EthIcon,
    color: iconColors.eth,
    fund: Fund.EthWallet,
    coin: Coin.ETH,
  },
  {
    idx: 2,
    textBeforeTitle: 'from',
    translate: 'usdtWallet',
    balance: bn(0),
    SvgIcon: UsdtIcon,
    color: iconColors.usdt,
    fund: Fund.UsdtWallet,
    coin: Coin.USDT,
  },
];

export const SELECTOR_SAVINGS_COINS: CoinSelect[] = [
  {
    idx: 0,
    textBeforeTitle: 'from',
    translate: 'btcSaving',
    balance: bn(0),
    SvgIcon: BtcIcon,
    color: iconColors.btc,
    fund: Fund.BtcSaving,
    coin: Coin.BTC,
  },
  {
    idx: 1,
    textBeforeTitle: 'from',
    translate: 'ethSaving',
    balance: bn(0),
    SvgIcon: EthIcon,
    color: iconColors.eth,
    fund: Fund.EthSaving,
    coin: Coin.ETH,
  },
  {
    idx: 2,
    textBeforeTitle: 'from',
    translate: 'usdtSaving',
    balance: bn(0),
    SvgIcon: UsdtIcon,
    color: iconColors.usdt,
    fund: Fund.UsdtSaving,
    coin: Coin.USDT,
  },
];

export const SELECTOR_COINS = {
  [Account.Wallet]: SELECTOR_WALLET_COINS,
  [Account.Savings]: SELECTOR_SAVINGS_COINS,
};
