import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  box: {
    padding: 16
  },
  title: {
    fontFamily: 'Exo2-Regular',
    fontSize: 12,
    color: '#460000',
    paddingBottom: 16
  },
  text: {
    fontFamily: 'Exo2-Regular',
    fontSize: 12,
    color: '#040c13'
  },
  group: {
    paddingTop: 22,
    paddingBottom: 22
  },
  label: {
    fontFamily: 'Exo2-SemiBold',
    fontSize: 12,
    color: '#040c13',
    alignSelf: 'center'
  },
  field: {
    width: 180,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontWeight: '800',
    fontSize: 36,
    color: '#000',
    textAlign: 'center',
    paddingBottom: 5
  },
  error: {
    paddingTop: 5,
    fontFamily: 'Exo2-Regular',
    fontSize: 12,
    color: '#dd4444',
    textAlign: 'center'
  }
});
