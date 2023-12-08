import { endpoints } from '@constants/endpoints';
import { $idx } from '@store/transfer';
import { twoFaStageFx } from '@store/twoFaVerify';
import { $verifyRequestDomain } from '@store/verify';
import { $accountIndex, $selectedAccount } from '@store/withdraw';
import { signedRequest } from '@utils/agent';
import { log } from '@utils/debug';
import { guard } from 'effector';
import { $idx as $idxLimit, $limitPerDay, fetchLimitPerDayFx } from './index';

fetchLimitPerDayFx.use(() => {
  const method = 'get';
  const url = endpoints.account.getLimitPerDay;
  return signedRequest({ method, url });
});

$idxLimit.on($idx, (_, id) => id).on($accountIndex, (_, id) => id);

$limitPerDay.on(fetchLimitPerDayFx.doneData, (_, response) => {
  return response.data.data.withdraw_limits.remnant;
});

guard({
  source: $verifyRequestDomain,
  clock: twoFaStageFx.done,
  filter: (requestDomain) =>
    ['TransferByEmail', 'TransferByPhone', 'Withdraw'].includes(requestDomain),
  target: fetchLimitPerDayFx,
});

// debug

/* $limitPerDay.watch((limit) => console.log({ limit }))

$selectedAccount.watch((selectedAccount) => log('[$store/limit]', { selectedAccount })); */
