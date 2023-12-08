import { StableDomain } from '@store/app';

import { BottomSheetRef } from './types';
import { ResponseDone, ResultFail } from '@store/api/types';
import { Stable } from '@store/stables/types';

export const submitCloseStable = StableDomain.createEvent<
  { id: Stable['id'] },
>();

export const closeStableFx = StableDomain.createEffect<
  { id: Stable['id'] },
  ResponseDone<{ code: 'ok' }>,
  ResultFail
>();

// bottom sheet
export const $bottomSheetFormRef = StableDomain.createStore<BottomSheetRef | null>(
  null
);

export const openBottomSheetForm = StableDomain.createEvent<void>();
export const closeBottomSheetForm = StableDomain.createEvent<void>();

export const submitBottomSheetForm = StableDomain.createEvent<{ id: number }>();

export const initBottomSheetForm = StableDomain.createEvent<BottomSheetRef>();
export const resetBottomSheetForm = StableDomain.createEvent<void>();

export const bottomSheetFormOpenFx = StableDomain.createEffect<
  BottomSheetRef,
  void
>();
export const bottomSheetFormCloseFx = StableDomain.createEffect<
  BottomSheetRef,
  void
>();
