import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  box: {
    fontSize: 14,
    color: colors.space900,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.independence400,
    borderRadius: 4,
    margin: 4,
    flexDirection: 'row',
  },
  active: {
    borderWidth: 2,
    borderColor: colors.purple500,
  },
  disabled: {
    borderColor: colors.independence400,
    backgroundColor: colors.independence100,
  },
  text: {
    marginLeft: 4,
  },
  circleContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  lable: { color: 'black', fontSize: 16 },
  imgBox: {
    margin: 4,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.independence400,
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  img: {
    height: 50,
    width: 50,
  },
});
