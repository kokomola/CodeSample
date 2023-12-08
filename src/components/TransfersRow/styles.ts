import { purple500 } from '@constants/colors';
import { shadow } from '@constants/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sv: {
    // paddingLeft: 16,
  },
  first: {
    marginLeft: 16,
  },
  last: {
    marginRight: 16,
  },
  card: {
    ...shadow,
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    marginVertical: 20,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple500,
  },
  title: {
    marginTop: 8,
    color: purple500,
    fontSize: 12,
    fontWeight: '500',
  },
});
