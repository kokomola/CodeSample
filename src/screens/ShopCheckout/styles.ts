import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputError: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  warningContainer: {
    borderRadius: 10,
    backgroundColor: '#ffe9b8',
    marginHorizontal: 16,
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  warningTextTitle: {
    lineHeight: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  warningText: {
    lineHeight: 20,
    fontSize: 15,
    color: '#000000',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    flex: 1,
  },
});
