import { AccessToken, DeviceToken } from '@store/auth/types';
import { AxiosError, AxiosResponse } from 'axios';

export type Request = {
  account_id: number;
  blockchain_amount: any;
  course: string;
  createdAt: string;
  denied_at: any;
  denier_id: any;
  deny_reason: any;
  hash: any;
  id: number;
  is_suspicious: boolean;
  job_id: string;
  meta: any;
  processed_at: any;
  spent_amount: string;
  spent_cost: string;
  spent_fee: string;
  spent_fund: 'usdt_wallet' | 'eth_wallet' | 'btc_wallet';
  status: string;
  target_address: string;
  target_amount: string;
  target_blockchain: string;
  target_fee: string;
  target_type:
    | 'blockchain'
    | 'usdt'
    | 'btc'
    | 'eth'
    | 'btc_wallet'
    | 'eth_wallet'
    | 'usdt_wallet';
  transaction_type: 'withdraw' | 'transfer' | 'p2ptransfer';
  updatedAt: any;
  usd_equiualent: string;
  verified_at: any;
  verifier_id: any;
  payload: any;
  withdraw_transfer_group_date: string | null;
};

export type FetchRequestsFxParams = {
  accessToken: AccessToken;
  deviceToken: DeviceToken;
};

export type FetchRequestsFxDone = { requests: Request[] };
export type FetchRequestsFxFail = AxiosError<{ code: 'error' }>;

export type CancelTransferRequestFxDone = any;
export type CancelTransferRequestFxFail = AxiosError<{ code: 'error' }>;
