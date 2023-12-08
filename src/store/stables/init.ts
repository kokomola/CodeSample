import { forward, sample } from 'effector';
import {
  $legacyStables,
  $stables,
  fetchLegacyStablesRequestFx,
  fetchStablesRequestFx,
  changeStables,
  changeLegacyStables,
  fetchStables,
  fetchLegacyStables,
} from '@store/stables/index';
import { endpoints } from '@constants/endpoints';
import { closeBS } from './../bottomSheetCommon/index';
import * as D from 'date-fns';

import {
  closeStableTermsBottomSheetFx,
  openStableTermsBottomSheet,
  stableTermsBottomSheetRef,
} from './index';
import { Stable } from './types';
import { signedRequest } from '@utils/agent';

$legacyStables.on(changeLegacyStables, (_, legacyStables) => legacyStables);

$stables.on(changeStables, (_, stables) => stables);

forward({
  from: fetchStables,
  to: fetchStablesRequestFx,
});

forward({
  from: fetchLegacyStables,
  to: fetchLegacyStablesRequestFx,
});

fetchLegacyStablesRequestFx.use(async () => {
  const method = 'get';
  const url = endpoints.stable.legacyFetch;

  return signedRequest({ method, url });
});

fetchStablesRequestFx.use(async () => {
  const method = 'get';
  const url = endpoints.stable.fetch;

  return signedRequest({ method, url });
});


sample({
  clock: fetchStablesRequestFx.doneData.map(
    (response) => response.data.data.accounts
  ),
  fn: (accounts) => {
    const sortDesc = (a: Stable, b: Stable) => D.compareDesc(a.createdAt, b.createdAt);
    return accounts.sort(sortDesc);
  },
  target: changeStables,
});

sample({
  clock: fetchLegacyStablesRequestFx.doneData.map(
    (response) => response.data.data.accounts
  ),
  fn: (accounts) => {
    const sortDesc = (a: Stable, b: Stable) => D.compareDesc(a.createdAt, b.createdAt);
    return accounts.sort(sortDesc);
  },
  target: changeLegacyStables,
});

/** stable terms bottomsheet */
openStableTermsBottomSheet.use(() => {
  if (stableTermsBottomSheetRef.current) {
    stableTermsBottomSheetRef.current.expand();
  }
});

closeStableTermsBottomSheetFx.use(() => {
  if (stableTermsBottomSheetRef.current) {
    stableTermsBottomSheetRef.current.close();
  }
  // use this because common bottom sheet can be opened
  closeBS(); // need delete
});
