import React from 'react';
import {useTranslation} from 'react-i18next';
import {useStore} from 'effector-react';

import {View, Text} from 'react-native';
import {Button} from '../uikit/Button';

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';

import {
  $bottomSheetFormRef,
  closeBottomSheetForm,
  submitCloseStable,
} from '@store/stablesClose';

import {s} from './styles';
import {StableCloseBottomSheetProps} from './types';

export const StableCloseBottomSheet: React.FC<
  StableCloseBottomSheetProps
> = props => {
  const {stableId, isClosable} = props;

  const {t} = useTranslation('StableClose');

  const [containerHeight, setContainerHeight] = React.useState(1);
  const snapPoints = React.useMemo(
    () => [1, containerHeight || 300],
    [containerHeight],
  );

  const handleOnLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => {
      setContainerHeight(height + 50);
    },
    [],
  );

  const bottomSheetFormRef = useStore($bottomSheetFormRef);

  if (!bottomSheetFormRef) return null;

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetFormRef}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          index={-1} // Hide the bottom sheet when we first load our component
          containerHeight={0}
          enablePanDownToClose={true}>
          <BottomSheetView onLayout={handleOnLayout}>
            <View style={s.btmSheetBox}>
              <Text style={s.btmSheetTitle}>{t('closeStableTitle')}</Text>
              <Text style={s.btmSheetTitle}>{t('noCapitalization')}</Text>
              <Text style={s.btmSheetText}>{t('earlyCLosureNotice')}</Text>
            </View>
            <View style={s.btmSheetBtnBox}>
              <View style={s.btnSheetBtnWrapper}>
                <Button
                  kind="SheetButton"
                  text={t('cancelCloseStable')}
                  type="secondary"
                  onPress={() => closeBottomSheetForm()}
                />
              </View>
              <View style={s.btnSheetBtnWrapper}>
                {!isClosable && (
                  <Text style={{color: 'red', textAlign: 'center'}}>
                    {t('cantClose')}
                  </Text>
                )}
                {isClosable && (
                  <Button
                    kind="SheetButton"
                    text={t('closeStable')}
                    onPress={() => submitCloseStable({id: stableId})}
                  />
                )}
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
      <PortalHost name="stableCloseHost" />
    </>
  );
};
