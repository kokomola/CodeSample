import React, {FC, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {default as GorhomBottomSheet} from '@gorhom/bottom-sheet';
import {BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import {useStore} from 'effector-react';
import {
  $bottomSheetRef,
  $fcKey,
  $height,
  initBSRef,
  resetBSRef,
  wasClosedBS,
  wasOpenedBS,
} from '@store/bottomSheetCommon';
import {bottomSheetFCs} from '@store/bottomSheetCommon/types';
import {styles as s} from './styles';

export const BottomSheet: FC = () => {
  useEffect(() => {
    initBSRef();
    return resetBSRef;
  }, []);

  const handleChanges = useCallback((index: number) => {
    async function onChange(isOpened: boolean) {
      isOpened ? wasOpenedBS() : wasClosedBS();
    }
    onChange(index !== -1);
  }, []);

  const bottomSheetRef = useStore($bottomSheetRef);
  const fcKey = useStore($fcKey);
  const height = useStore($height);

  const snapPoints = React.useMemo(() => {
    return [1, height];
  }, [height]);

  const Child = fcKey
    ? (bottomSheetFCs[fcKey] as React.ElementType)
    : () => <Text>Empty</Text>;

  if (!bottomSheetRef) {
    // logline('[Bottom Sheet]', '!! is empty - ref is not created !!');
    return null;
  }

  return (
    <>
      <Portal>
        <GorhomBottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          index={-1} // Hide the bottom sheet when we first load our component
          containerHeight={0}
          onChange={handleChanges}
          enablePanDownToClose={true}>
          <BottomSheetView style={{height}}>
            <View style={s.minHeight}>
              <Child />
            </View>
          </BottomSheetView>
        </GorhomBottomSheet>
      </Portal>
      <PortalHost name="BottomSheetCommon" />
    </>
  );
};
