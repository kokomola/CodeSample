import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  box: {
  },
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
  titleBox: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 3,
    marginBottom: 22,
  },
  bottomView: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonBox: { flexGrow: 1, paddingLeft: 12 },
  options: {
    marginVertical: 13,
  },
  optionTitle: {
    marginBottom: 10,
    fontSize: 16,
  },
  picture: {
    marginBottom: 40,
    maxWidth: '100%',
    maxHeight: 200,
    marginVertical: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    paddingVertical: 5,
  },
});
