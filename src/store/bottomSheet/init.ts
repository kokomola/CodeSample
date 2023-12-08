import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  $bottomSheetName,
  $bottomSheetRef,
  changeBottomSheetName,
  closeBottomSheet,
  closeBottomSheetFx,
  initBottomSheet,
  openBottomSheet,
  openBottomSheetFx,
  resetBottomSheet,
} from './index';
import {sample} from 'effector';
import {Keyboard} from 'react-native';

$bottomSheetRef
  .on(initBottomSheet, () => React.createRef<BottomSheet>())
  .reset(resetBottomSheet);
//.watch((ref) => console.log('[@store/rename $bottomSheetRef]', !!ref));

$bottomSheetName.on(changeBottomSheetName, (_, name) => name);

sample({
  clock: openBottomSheet,
  source: $bottomSheetRef,
  target: openBottomSheetFx,
});
sample({
  clock: closeBottomSheet,
  source: $bottomSheetRef,
  target: closeBottomSheetFx,
});

openBottomSheetFx.use(ref => {
  ref?.current?.snapToIndex(1);
});
closeBottomSheetFx.use(ref => {
  ref?.current?.close();
  Keyboard.dismiss();
});
