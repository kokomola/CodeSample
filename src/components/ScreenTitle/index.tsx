import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { TwoFaWarning } from '@components/TwoFAWarning';
import { Icon } from '@components/uikit/Icon';
import { useNavigation } from '@react-navigation/native';
import { is } from '@utils/common/condition';

import { styles as s } from './styles';
import { ScreenTitleProps } from './types';

export const ScreenTitle: React.FC<ScreenTitleProps> = (props) => {
  const { title, buttons, back, showTwoFAWarning } = props;
  const navigate = useNavigation();

  const handleBack = () => {
    navigate?.canGoBack() && navigate.goBack();
  };

  return (
    <View style={s.box}>
      {is.exist(back) && (
        <TouchableOpacity style={s.back} onPress={handleBack}>
          <Icon icon="arrowLeft" size={'md'} />
          <Text style={[s.title, s.marginLeft]}>{title}</Text>
        </TouchableOpacity>
      )}
      {is.empty(back) && (
        <View style={s.titleView}>
          <Text style={s.title}>{title}</Text>
          {showTwoFAWarning && <TwoFaWarning />}
        </View>
      )}

      {is.exist(buttons) && <View>{buttons}</View>}
    </View>
  );
};
