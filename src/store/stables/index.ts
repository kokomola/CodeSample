import { Stable } from '@store/stables/types';

import { ResponseDone } from '@store/api/types';
import { createRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { StableDomain } from '@store/app';
import { log, logline } from '@utils/debug';

// Main

export const $legacyStables = StableDomain.createStore<Stable[]>([]);
export const changeLegacyStables = StableDomain.createEvent<Stable[]>();
export const fetchLegacyStablesRequestFx = StableDomain.createEffect<
  void,
  ResponseDone<{ accounts: Stable[] }>
>();
export const fetchLegacyStables = StableDomain.createEvent<void>();

export const $stables = StableDomain.createStore<Stable[]>([]);

export const changeStables = StableDomain.createEvent<Stable[]>();
export const fetchStablesRequestFx = StableDomain.createEffect<
  void,
  ResponseDone<{ accounts: Stable[] }>
>();
export const fetchStables = StableDomain.createEvent<void>();

export const $openedStableAccounts = $stables.map((stables) =>
  stables.filter((stable) => !stable.is_ended)
);

export const $closedStableAccounts = $stables.map((stables) =>
  stables.filter((stable) => stable.is_ended)
);

export const $openedLegacyAccounts = $legacyStables.map((legacy) =>
  legacy.filter((stable) => !stable.is_ended)
);

export const $closedLegacyAccounts = $legacyStables.map((legacy) =>
  legacy.filter((stable) => stable.is_ended)
);

/** stable terms bottomsheet */

export const stableTermsBottomSheetRef = createRef<BottomSheet>();

export const openStableTermsBottomSheet = StableDomain.createEffect();

export const closeStableTermsBottomSheetFx = StableDomain.createEffect<
  void,
  void
>();

//$stables.watch((stables) => log("[$store/stables]", stables.filter(stable => !stable.is_ended && !!stable?.promotion).map(stable => ({ ...stable, paymentChart: null }))));