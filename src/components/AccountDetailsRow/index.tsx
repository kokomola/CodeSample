import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';

import { styles as s } from './styles';

import { IconName } from '@components/uikit/Icon';

type AccountDetailsRowProps = {
  label: string;
  value: string;
  icon?: IconName;
  onPress?: () => any;
  hasCopyOnPress?: boolean;
};

export const AccountDetailsRow: React.FC<AccountDetailsRowProps> = (props) => {
  const { label, value, icon, onPress, hasCopyOnPress } = props;

  const copyIcon = hasCopyOnPress ? 'copy' : icon;
  const copyFunc = hasCopyOnPress
    ? () => {
        Clipboard.setString(value);
      }
    : onPress;

  const renderInner = () => (
    <>
      <View style={s.details}>
        <Text style={s.value}>{value}</Text>
        <Text style={s.label}>{label}</Text>
      </View>

      {icon || copyIcon ? (
        <View style={s.icon}>
          <Icon icon={copyIcon || null} color={colors.purple500} />
        </View>
      ) : null}
    </>
  );

  return (
    <TouchableOpacity style={s.box} onPress={onPress || copyFunc}>
      {renderInner()}
    </TouchableOpacity>
  );
};
