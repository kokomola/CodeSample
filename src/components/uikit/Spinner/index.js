import React from 'react';
import { Animated, Easing } from 'react-native';

import { Icon } from '../Icon';

export const Spinner = props => {
  const [value] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(Animated.timing(value, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
  }, []);

  const rotate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={{ transform: [{ rotate }], alignSelf: 'center' }}>
      <Icon {...props} icon="spinner" />
    </Animated.View>
  );
};
