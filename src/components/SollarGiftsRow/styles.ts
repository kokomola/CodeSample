import { purple500, space900 } from '@constants/colors';
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
    height: 200,
    width: 148,
    padding: 12,
    marginRight: 12,
    marginVertical: 20,
    justifyContent: 'space-between',
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
    color: space900,
    fontSize: 12,
    fontWeight: '400',
  },
  price: {},
  bannerImage: {
    borderRadius: 8,
    width: 108,
    height: 108,
    alignSelf: 'center',
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleButtonText: {
    color: purple500,
    fontWeight: '600',
  },
});
