import BottomSheet from '@gorhom/bottom-sheet';
import { AppDomain } from '@store/app';

type BottomSheetRef = React.RefObject<BottomSheet>;

export const $bottomSheetRef = AppDomain.createStore<BottomSheetRef | null>(
  null
);

export const initBottomSheet = AppDomain.createEvent<void>();

export const $bottomSheetName = AppDomain.createStore<string>('default');
export const changeBottomSheetName = AppDomain.createEvent<string>();

export const openBottomSheet = AppDomain.createEvent<void>();
export const closeBottomSheet = AppDomain.createEvent<void>();
export const resetBottomSheet = AppDomain.createEvent<void>();

export const openBottomSheetFx = AppDomain.createEffect<BottomSheetRef, void>();
export const closeBottomSheetFx = AppDomain.createEffect<
  BottomSheetRef,
  void
>();
