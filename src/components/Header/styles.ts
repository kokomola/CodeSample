import { space900 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    marginLeft: 15,
    color: space900,
    fontWeight: '400',
  },
});
