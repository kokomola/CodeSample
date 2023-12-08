import { fonts } from '@constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    minWidth: 70,
    marginVertical: 8,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 7,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    overflow: 'hidden',
    ...fonts.medium,
  },
});
