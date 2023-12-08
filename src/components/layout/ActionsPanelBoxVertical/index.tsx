import * as React from 'react';
import {View} from 'react-native';
import {styles as s} from './styles';

export const ActionsPanelBoxVertical: React.FC<{
  children: JSX.Element;
}> = props => {
  const {children} = props;

  return <View style={s.root}>{children}</View>;
};
