import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { shadow as ShadowByPlatform } from '@constants/platform';

export const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
    ...ShadowByPlatform,
  },
  iconBox: {
    paddingRight: 12,
  },
  infoBox: {
    flexGrow: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  rightBox: {
    justifyContent: 'center',
    backgroundColor: colors.space200,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  percent: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.space500,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.space900,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.independence500,
    paddingTop: 2,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 30,
  },
});
