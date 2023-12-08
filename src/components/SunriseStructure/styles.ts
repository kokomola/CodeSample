import { StyleSheet } from 'react-native';
import { fonts } from '../../consts/fonts';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  title: {
    ...fonts.bold,
    fontSize: 20,
    color: colors.space900,
  },
  monthWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lines: {
    marginTop: 20,
  },
  line: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomColor: colors.independence200,
    borderBottomWidth: 1,
  },
  lineName: {
    color: colors.space500,
    fontSize: 12,
  },
  current: {
    flexDirection: 'column',
    flex: 0.43,
    //width: '43%',
    //borderWidth: 1,
    //borderColor: 'blue',
  },
  min: {
    //width: '43%',
    flex: 0.45,
    paddingLeft: 5,
    //borderWidth: 1,
    //borderColor: 'red',
  },
  allChildren: {
    flex: 0.12,
    //width: '14%',
    //borderWidth: 1,
    //borderColor: 'purple',
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: colors.space900,
    fontSize: 13,
    ...fonts.medium,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    alignSelf: 'center',
    margin: 6,
  },
  row: {
    flexDirection: 'row',
  },
  new: {
    ...fonts.bold,
    color: 'white',
    fontSize: 13,
    borderRadius: 13,
    padding: 3.5,
    paddingRight: 6,
    marginLeft: 6,
    width: 25,
    height: 25,
    alignSelf: 'center',
    backgroundColor: colors.oceanGreen,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
