import { ServerConfig } from '@store/serverConfig/types';
import { Fund } from '@store/wallets/types';
import { NormalizeStyles } from 'react-native-dynamic';

export type USDTNetwork = 'usdt_erc20' | 'usdt_trc20' | 'usdt_bep20';

export type TxFeeBlockchain = 'eth' | 'btc' | 'erc20' | 'trc20';

export type TxFee = {
  currency: 'btc' | 'ether';
  fast: string;
  fastest: string;
  quantity: string;
  slow: string;
};

export type TxFees = Record<'btc' | 'erc20' | 'eth' | 'trc20', TxFee>;

export type GetFeeParams = {
  fund: Fund;
  txFees: TxFee | null;
  chosenFee?: Fee | null;
  implementation: string;
  amount: number;
  config: ServerConfig | null;
  courses: NormalizeStyles<any>;
};

export type Fee = {
  speed: string;
  value: string;
};
export type WithdrawRequestPayload = {
  fund: Fund;
  address: string;
  amount: string;
  implementation?: USDTNetwork;
  fee: Fee;
};
