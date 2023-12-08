import * as React from 'react';
import {useTranslation} from 'react-i18next';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';

import {stableTermsBottomSheetRef} from '@store/stables';

import {Text, View} from 'react-native';
import {styles as s} from './styles';

export const StableTermsBottomSheet: React.FC = () => {
  const [t] = useTranslation('StableTermsBottomSheet');

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
      setContainerHeight(300 || height);
    },
    [],
  );

  const stableTermsMap = [
    {label: t('replenishment'), value: t('optNo')},
    {label: t('partialWithdrawal'), value: t('optNo')},
    {label: t('prolongation'), value: t('optNo')},
    {label: t('earlyClosure'), value: t('smallText')},
  ];

  return (
    <Portal>
      <BottomSheet
        ref={stableTermsBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        containerHeight={0}
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetView onLayout={handleOnLayout}>
          <View style={s.box}>
            <Text style={s.actionSheetTitle}>{t('accountTerms')}</Text>

            {stableTermsMap.map(term => (
              <View style={s.actionSheetBox} key={term.label}>
                <Text style={s.actionSheetLabel}>{term.label}</Text>
                <Text style={s.actionSheetValue}>{term.value}</Text>
              </View>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
