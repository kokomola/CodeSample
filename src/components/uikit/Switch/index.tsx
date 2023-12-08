import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import * as colors from '@constants/colors';
import { ISwitchProps } from './types';
import { styles as s } from './styles';

const defaultProps = {
  value: false,
  onValueChange: () => null,
  renderInsideCircle: () => null,
  backgroundActive: colors.purple500,
  backgroundInactive: colors.independence300,
  circleActiveColor: colors.white,
  circleInactiveColor: colors.white,
  circleBorderActiveColor: 'rgb(100, 100, 100)',
  circleBorderInactiveColor: 'rgb(80, 80, 80)',
  circleSize: 24,
  barHeight: 32,
  circleBorderWidth: 0,
  changeValueImmediately: true,
  innerCircleStyle: { alignItems: 'center', justifyContent: 'center' },
  outerCircleStyle: {},
  switchLeftPx: 1.7,
  switchRightPx: 1.7,
  switchWidthMultiplier: 2.6,
  switchBorderRadius: 30,
};

export const Switch: React.FC<ISwitchProps> = (props) => {
  const { value: initValue, circleSize, switchLeftPx, switchRightPx } = {
    ...defaultProps,
    ...props,
  };

  // const [value, setValue] = useState(initValue);
  const [transformSwitch] = useState(
    new Animated.Value(
      initValue ? circleSize / switchLeftPx : -circleSize / switchRightPx
    )
  );
  const [backgroundColor] = useState(new Animated.Value(initValue ? 75 : -75));
  const [circleColor] = useState(new Animated.Value(initValue ? 75 : -75));
  const [circleBorderColor] = useState(
    new Animated.Value(initValue ? 75 : -75)
  );

  const animateSwitch = (
    _value: boolean,
    cb = () => {
      /**/
    }
  ) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: _value
          ? circleSize / switchLeftPx
          : -circleSize / switchRightPx,
        //speed: 2,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: _value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: _value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: _value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(cb);
  };

  const handleSwitch = () => {
    const { value: propValue, onValueChange, changeValueImmediately } = {
      ...defaultProps,
      ...props,
    };

    animateSwitch(!propValue);
    onValueChange(!propValue);
  };

  const {
    backgroundActive,
    backgroundInactive,
    circleActiveColor,
    circleInactiveColor,
    containerStyle,
    barHeight,
    circleBorderActiveColor,
    circleBorderInactiveColor,
    circleBorderWidth,
    innerCircleStyle,
    outerCircleStyle,
    renderInsideCircle,
    switchWidthMultiplier,
    switchBorderRadius,
    ...restProps
  } = { ...defaultProps, ...props };

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [backgroundInactive, backgroundActive],
  });

  const interpolatedCircleColor = circleColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleInactiveColor, circleActiveColor],
  });

  const interpolatedCircleBorderColor = circleBorderColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleBorderInactiveColor, circleBorderActiveColor],
  });

  return (
    <TouchableWithoutFeedback onPress={handleSwitch} {...restProps}>
      <Animated.View
        style={[
          s.container,
          containerStyle,
          {
            backgroundColor: interpolatedColorAnimation,
            width: circleSize * switchWidthMultiplier,
            height: barHeight || circleSize,
            borderRadius: switchBorderRadius || circleSize,
          },
        ]}
      >
        <Animated.View
          style={[
            s.animatedContainer,
            {
              left: transformSwitch,
              width: circleSize * switchWidthMultiplier,
            },
            outerCircleStyle,
          ]}
        >
          <Animated.View
            style={[
              s.circle,
              {
                borderWidth: circleBorderWidth,
                borderColor: interpolatedCircleBorderColor,
                backgroundColor: interpolatedCircleColor,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
              },
              innerCircleStyle,
            ]}
          >
            {renderInsideCircle && renderInsideCircle()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
