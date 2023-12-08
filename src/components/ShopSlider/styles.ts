import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  carousel: {
    marginTop: 20,
    alignItems: 'center',
  },
  carouselItem: {
    width: '70%',
    height: 200,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: colors.purple500,
  },
  inactiveDotStyle: {
    backgroundColor: colors.independence400,
  },
});
