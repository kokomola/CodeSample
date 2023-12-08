import { fonts } from '@constants/fonts';
import { isAndroid, isIOS } from '@constants/platform';
import * as colors from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  base: {
    paddingHorizontal: 16,
  },
  select: {
    ...fonts.medium,
  },
  selectWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.independence500,
    marginVertical: 25,
    position: 'relative',
    //paddingTop: isAndroid ? 13 : 0,
    paddingTop: 12,
    width: '100%',
  },
  inputBox: {},
  label: {
    position: 'absolute',
    fontSize: 12,
  },
  text: { color: 'black', fontSize: 16 },
  placeholder: {
    position: 'absolute',
    fontSize: 17,
    top: 0,
    right: 0,
    bottom: 0,
    textAlignVertical: 'center',
    lineHeight: isIOS ? 40 : 20,
    paddingRight: 10,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    marginVertical: 20,
  },
  switchWrapperError: {
    marginTop: -20,
    paddingBottom: 20,
  },
  switchLabel: {
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: 'black',
    fontSize: 16,
    ...fonts.medium,
    marginVertical: 8,
  },
  buttonWrapper: {
    marginVertical: 40,
  },
  giftPickerLabel: {
    fontSize: 16,
    color: colors.space900,
    ...fonts.semibold,
    marginBottom: 16,
  },
  giftPicker: {
    marginBottom: 20,
  },
  giftOptions: {
    marginTop: 10,
    marginBottom: 20,
  },
  giftPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  giftPreviewName: {
    fontSize: 16,
    color: colors.space900,
    ...fonts.bold,
    marginLeft: 20,
    flex: 1,
  },
  sunnyBookDeliveryOptions: {
    marginBottom: 30,
  },
});
