import * as React from 'react';
import {View} from 'react-native';

import {styles as s} from './styles';

export const AccentBox: React.FC<{children: JSX.Element}> = props => {
  const {children} = props;

  return <View style={s.box}>{children}</View>;
};
