import { StyleSheet } from 'react-native';
import { white, oceanGreen } from '@constants/colors';

export const styles = StyleSheet.create({
  productFeaturedLabel: {
    paddingVertical: 1,
    backgroundColor: oceanGreen,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  productFeaturedLabelText: {
    fontSize: 13,
    fontWeight: '500',
    color: white,
    textAlign: 'center',
    paddingHorizontal: 7,
  },
});
