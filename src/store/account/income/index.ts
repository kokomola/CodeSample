import { AccountDomain } from '@store/app';
import { AccountIncome } from './types';
import { ResponseDone } from '@store/api/types';
import { Params } from '@constants/endpoints';
import { Fund } from '@constants/funds';

export const $incomes = AccountDomain.createStore<AccountIncome[]>([]);

export const fetchOperationFx = AccountDomain.createEffect<
  { fund: Fund } & Params,
  ResponseDone<AccountIncome[]>
>();
