import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { white, oceanGreen } from '@constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 9,
    flexDirection: 'row',
  },
  image: {
    width: 106,
    height: 106,
    marginVertical: 5,
  },
  small: {
    width: 80,
    height: 80,
    marginVertical: 21,
  },
  noPicture: {
    width: 110,
    height: 92,
    marginBottom: 20,
  },
  titleFeatured: {
    marginTop: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.space300,
    marginHorizontal: 20,
  },
  productFeaturedLabel: {
    backgroundColor: oceanGreen,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    minWidth: 80,
    marginVertical: 10,
  },
  productFeaturedLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: white,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 2,
    marginHorizontal: 6,
  },
  imageWrapper: {
    marginLeft: 16,
  },
  contentWrapper: {
    flex: 1,
    marginLeft: '3%',
  },
  title: {
    maxWidth: '90%',
    marginTop: 5,
  },
  titleForNew: {
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    marginTop: 12,
    width: 74,
  },
  labels: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipIcon: {
    marginRight: 5,
  },
});
