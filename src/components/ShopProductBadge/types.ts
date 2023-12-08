import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type ShopProductBadgeProps = {
  styleWrapper?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  children: string;
};
