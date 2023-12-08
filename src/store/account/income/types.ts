import { Fund } from '@constants/funds';

export type AccountIncome = {
  id: number;
  account_id: number;
  amount: number;
  fund: Fund;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  meta?: Object;
  is_old?: boolean;
  stable_score_id?: number | null;
  group_id?: number | null;
  new_stable_score_id?: number | null;
  pay_id?: string | null;
};
