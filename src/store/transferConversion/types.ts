import { Fund } from '@store/wallets/types';
import { AccessToken, DeviceToken } from '@store/auth/types';

export type LeadingField = 'spent' | 'target';

export type TransferConversionPayload = {
  amount: string;
  from_fund: Fund;
  to_fund: Fund;
  leading_field: LeadingField;
};

export type TransferConversionFxDone = void;

export type VerifyTransferConversionPayload = {
  code: string;
};

export type VerifyTransferConversionFxDone = void;
