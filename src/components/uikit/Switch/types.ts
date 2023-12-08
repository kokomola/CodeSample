import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ISwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  renderInsideCircle?: () => ReactNode;
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInactiveColor?: string;
  circleSize?: number;
  circleBorderActiveColor?: string;
  circleBorderInactiveColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  barHeight?: number;
  circleBorderWidth?: number;
  changeValueImmediately?: boolean;
  innerCircleStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  switchLeftPx?: number;
  switchRightPx?: number;
  switchWidthMultiplier?: number;
  switchBorderRadius?: number;
}
