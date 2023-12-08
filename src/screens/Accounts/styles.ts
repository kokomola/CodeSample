import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  securityAlertBox: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 16,
    fontSize: 20,
    color: colors.space900,
    fontWeight: '800',
  },
  section: {
    paddingHorizontal: 16,
  },
  titleButtonText: {
    color: colors.purple500,
    fontWeight: '600',
  },
  rqstButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  buttons: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonBox: {
    paddingVertical: 4,
  },
  coursesBox: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
