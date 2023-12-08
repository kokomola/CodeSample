import React from 'react';
import { CircleIcon, Icon } from '@components/uikit/Icon';
import { $user } from '@store/user';
import { useStore } from 'effector-react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';
import { shadowColor } from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/navigator/routes';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Header: React.FC<Props> = ({ style }) => {
  const user = useStore($user);
  const { navigate } = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => {
          navigate(routes.tabs.Settings);
        }}
      >
        <CircleIcon icon="user" color={shadowColor} />
        <Text style={styles.email}>{user.email}</Text>
        <Icon icon="chevronRight" />
      </TouchableOpacity>
      <Icon icon="bell" />
    </View>
  );
};
