import { TwoFaStatus, TwoFaType } from '@store/user/types';

export type TFAStatusProps = {
  status: TwoFaStatus;
  type: TwoFaType;
};
