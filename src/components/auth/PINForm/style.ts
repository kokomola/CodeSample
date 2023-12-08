import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topButton: {
    padding: 10,
  },
  topButtonText: {
    fontFamily: 'Exo2-Regular',
    color: '#000',
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Exo2-Regular',
    fontSize: 16,
    color: '#000',
  },
  error: {
    alignSelf: 'center',
    fontFamily: 'Exo2-Regular',
    fontSize: 16,
    color: '#dd4444',
  },
  dots: {
    maxWidth: 320,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 500,
    backgroundColor: '#e2e2e2',
    margin: 8,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  errorDot: {
    backgroundColor: '#dd4444',
  },
  numpad: {
    maxWidth: 320,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 50,
    margin: 10,
  },
  button: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    /*     borderWidth: 1,
    borderColor: 'red', */
    zIndex: 3,
  },
  delButton: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    /*     borderWidth: 1,
    borderColor: 'purple', */
    zIndex: 1,
  },
  disabledButton: {
    opacity: 0.25,
  },
  hiddenButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 32,
    fontFamily: 'Exo2-Regular',
    color: '#000',
  },
});
