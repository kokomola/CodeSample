import React, {ReactNode, useEffect} from 'react';

import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';

import {useStore} from 'effector-react';

//import { linelog, log } from '@utils/debug';
import {
  changeBottomSheetName,
  $bottomSheetRef,
  //$bottomSheetName,
} from '@store/bottomSheet';

interface IProps {
  name?: string;
  hasKeyboard?: boolean;
  customHeight?: number;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<IProps> = props => {
  const {name = 'default', children, customHeight, hasKeyboard} = props;

  useEffect(() => {
    changeBottomSheetName(name);
  }, [name]);

  const [containerHeight, setContainerHeight] = React.useState(1);
  const snapPoints = React.useMemo(() => {
    return [1, containerHeight || 300];
  }, [containerHeight]);

  const spaceForKeyboard = hasKeyboard ? 300 : 0;

  const handleOnLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => {
      setContainerHeight(customHeight || height + spaceForKeyboard);
    },
    [customHeight, spaceForKeyboard],
  );

  const bottomSheetRef = useStore($bottomSheetRef);
  //const bottomSheetName = useStore($bottomSheetName);

  if (!bottomSheetRef) return null;

  return (
    <>
      <Portal>
        <GorhomBottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          index={-1} // Hide the bottom sheet when we first load our component
          containerHeight={0}
          enablePanDownToClose={true}>
          <BottomSheetView onLayout={handleOnLayout}>
            {children}
          </BottomSheetView>
        </GorhomBottomSheet>
      </Portal>
      <PortalHost name={name} />
    </>
  );
};
