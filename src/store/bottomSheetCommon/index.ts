import { AppDomain } from '@store/app';
import { BottomSheetFCKeys, BottomSheetRef } from './types';

export const $bottomSheetRef = AppDomain.createStore<BottomSheetRef | null>(
  null
);

export const $fcKey = AppDomain.createStore<BottomSheetFCKeys | null>(null);
export const $height = AppDomain.createStore<number>(200);

export const initChildBS = AppDomain.createEvent<{
  fcKey: BottomSheetFCKeys;
  height: number;
}>();

export const initBSRef = AppDomain.createEvent<void>();
export const resetBSRef = AppDomain.createEvent<void>();

export const openBS = AppDomain.createEvent<BottomSheetFCKeys>();
export const closeBS = AppDomain.createEvent();

export const wasOpenedBS = AppDomain.createEvent();
export const wasClosedBS = AppDomain.createEvent();

export const openBSFx = AppDomain.createEffect<BottomSheetRef | null, void>();
export const closeBSFx = AppDomain.createEffect<BottomSheetRef | null, void>();

export const initAndOpenBSFx = AppDomain.createEffect<
  { fcKey: BottomSheetFCKeys; height: number; fn?: () => void },
  void
>();
