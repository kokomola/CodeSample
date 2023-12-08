import * as React from 'react';
import {useTranslation} from 'react-i18next';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';

import {sunrisePorfileInfoBottomSheetRef} from '@store/sunrise';
import {SunriseProfileInfo} from '@components/SunriseProfileInfo';

import {sunriseProgramsFullMap} from '@utils/sunriseMaps';

export const SunriseProfileInfoBottomSheet: React.FC = () => {
  const [t] = useTranslation();

  const [containerHeight, setContainerHeight] = React.useState(1);

  const snapPoints = React.useMemo(() => {
    return [1, containerHeight + 30];
  }, [containerHeight + 30]);

  const handleOnLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => {
      setContainerHeight(height);
    },
    [],
  );

  return (
    <Portal>
      <BottomSheet
        ref={sunrisePorfileInfoBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        containerHeight={0}
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetView onLayout={handleOnLayout}>
          <SunriseProfileInfo
            sunriseProgramsFullMap={sunriseProgramsFullMap(t)}
          />
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
