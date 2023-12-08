import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '@components/uikit/Icon';
import * as colors from '@constants/colors';

import { styles as s } from './styles';

type TxsBoxProps = {
  children: React.ReactNode;
};

export const TxsBox: React.FC<TxsBoxProps> = (props) => {
  const { children } = props;

  return <View style={s.txsBox}>{children}</View>;
};

type BackButtonProps = {
  text?: string;
};

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { text = '' } = props;
  const navigation = useNavigation();

  return (
    <View style={s.backButtonBox}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={s.backButton}
      >
        <Icon icon="arrowLeft" color={colors.purple500} />
        {text.length > 0 ? <Text style={s.backButtonText}>{text}</Text> : null}
      </TouchableOpacity>
    </View>
  );
};
