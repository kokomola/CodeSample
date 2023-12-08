import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    width: Dimensions.get('screen').width - 32,
    height: Dimensions.get('screen').width - 32,
    backgroundColor: '#fff',
    marginVertical: 32,
  },
  closeButton: {
    width: Dimensions.get('screen').width - 32,
  },
  camera: {
    width: Dimensions.get('screen').width - 32,
    height: Dimensions.get('screen').width - 32,
    overflow: 'hidden',
  },
  tipBox: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 32,
    padding: 16,
    borderRadius: 6,
  },
  tip: {
    fontSize: 16,
  },
});
