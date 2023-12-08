import { guard, sample } from 'effector';

import { $fund, selectFund } from '@store/account/fund/index';
import { endpoints, Params } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';

import { $incomes, fetchOperationFx } from './index';
import { Fund, isFund } from '@constants/funds';
import { focusCryptoWalletScreen, focustSavingScreen } from '@store/app';

$incomes.on(
  fetchOperationFx.doneData,
  (_, response) => response?.data?.data || []
);

const focusWithFund = sample({
  clock: [focusCryptoWalletScreen, focustSavingScreen],
  source: $fund,
  fn: (fund) => fund,
});

guard({
  clock: [selectFund, focusWithFund],
  filter: (fund) => !!fund && isFund(fund),
  target: fetchOperationFx.prepend((fund) => ({ fund, limit: 10, offset: 0 })),
});

fetchOperationFx.use((params: { fund: Fund } & Params) => {
  const url = endpoints.account.fetchOperations(params);
  return signedRequest({ url, body: null });
});

// debug

//$incomes.watch((incomes) => log('[$incomes]', incomes.length));
