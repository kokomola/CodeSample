import { space500, space900 } from '@constants/colors';
import { shadow } from '@constants/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    ...shadow,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 16,
    color: space900,
  },
  detail: {
    fontSize: 14,
    color: space500,
    fontWeight: '400',
    marginTop: 2,
  },
});
