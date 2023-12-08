import React from 'react';
import { ScrollView } from 'react-native';
import {
  $scrollViewRef,
  initScrollViewRef,
  resetScrollViewRef,
  scrollToBottomFx,
} from './index';
import { logline } from '@utils/debug';

$scrollViewRef
  .on(initScrollViewRef, () => React.createRef<ScrollView>())
  .reset(resetScrollViewRef);
//.watch((ref) => logline('[@store/sunrise] ref', ref?.current));

scrollToBottomFx.use((ref) => {
  logline('[scrollToBottom]', !!ref?.current);
  setTimeout(
    () =>
      ref?.current?.scrollTo({
        x: 0,
        y: 1000,
        animated: true,
      }),
    500
  );
});
