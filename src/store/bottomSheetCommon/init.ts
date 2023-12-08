import React from 'react';
import {sample, guard} from 'effector';
import {Keyboard} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  $bottomSheetRef,
  $fcKey,
  $height,
  closeBS,
  closeBSFx,
  initAndOpenBSFx,
  initBSRef,
  initChildBS,
  openBS,
  openBSFx,
  resetBSRef,
} from './index';
import {logline} from '@utils/debug';
import {setTimeoutFx} from '@store/app/timeout';

$bottomSheetRef
  .on(initBSRef, () => React.createRef<BottomSheet>())
  .reset(resetBSRef);

$fcKey.on(initChildBS, (_, {fcKey}) => fcKey);

$height.on(initChildBS, (_, {height}) => height);

sample({
  clock: guard({
    clock: openBS,
    source: $fcKey,
    filter: (currentFcKey, wantOpenFcKey) => currentFcKey === wantOpenFcKey,
  }),
  source: $bottomSheetRef,
  target: openBSFx,
});

sample({
  clock: closeBS,
  source: $bottomSheetRef,
  target: closeBSFx,
});

openBSFx.use(ref => ref?.current?.snapToIndex(1));

closeBSFx.use(ref => {
  //logline('[$store/bottomSheetCommon]', 'closeBS');
  ref?.current?.close();
  Keyboard.dismiss();
});

initAndOpenBSFx.use(({fcKey, height, fn}) => {
  initChildBS({fcKey, height});
  if (fn) {
    logline('$store/BS', 'function is defined');
    setTimeoutFx({fn, time: 300});
  } else {
    logline('$store/BS', 'function is undefined');
    setTimeoutFx({fn: () => openBS(fcKey), time: 300});
  }
});

/* .watch((h) => logline('[@store/bottomSheetCommon]', h));
.watch((fcKey) => logline('[@store/bottomSheetCommon]', { fcKey }));
.watch((ref) => logline('[@store/bottomSheetCommon] ref', !!ref?.current)); */
