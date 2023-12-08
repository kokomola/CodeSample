import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles as s } from './styles';
import { BackButtonProps } from './types';
import { TwoFaWarning } from '@components/TwoFAWarning';
import { is } from '@utils/common/condition';
import { ArrowLeft } from '@components/uikit/Icon/lib';
import { purple500 } from '@constants/colors';

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { text = '', onPress, showTwoFAWarning = false } = props;
  const navigation = useNavigation();

  const canPress = onPress ?? navigation.canGoBack();

  return (
    <View style={s.backButtonBox}>
      <TouchableOpacity
        disabled={!canPress}
        onPress={onPress ? onPress : () => navigation.goBack()}
        style={s.backButton}
      >
        <ArrowLeft fill={purple500} />
        {is.exist(text) && <Text style={s.backButtonText}>{text}</Text>}
        {showTwoFAWarning && <TwoFaWarning />}
      </TouchableOpacity>
    </View>
  );
};
