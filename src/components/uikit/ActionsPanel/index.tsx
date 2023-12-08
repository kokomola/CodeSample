import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import * as colors from '@constants/colors';
import { Icon, IconName } from '@components/uikit/Icon';

import { styles as s } from './styles';

export type Action = {
  icon?: IconName;
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export type ActionsPanelProps = {
  actions: Action[];
};

export const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const { actions } = props;

  const renderAction = (action: Action) => {
    if (action.disabled) {
      return (
        <View key={action.label} style={s.touchableBox}>
          <Icon icon={action.icon || null} color={colors.independence400} />
          <Text style={[s.label, s.labelDisabled]}>{action.label}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={action.label}
        style={s.touchableBox}
        onPress={() => (!action.disabled ? action.onPress() : null)}
      >
        <Icon icon={action.icon || null} color={colors.white} />
        <Text style={s.label}>{action.label}</Text>
      </TouchableOpacity>
    );
  };

  return <View style={s.box}>{actions.map(renderAction)}</View>;
};
