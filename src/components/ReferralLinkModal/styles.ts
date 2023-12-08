import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalShadowWrapper: {
    //dark layer over screen
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    marginTop: '15%', // refactor to dynamic
    marginHorizontal: 14,
    paddingHorizontal: 14,
    paddingTop: 15,

    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    paddingTop: 5,
    paddingBottom: 20,
  },
  modalTitle2: {
    // added because of inner padding of input
    fontSize: 20,
    fontWeight: 'bold',

    paddingBottom: 10,
  },
  modalInput: {
    marginBottom: 5,
  },
  modalButton: {
    marginVertical: 20,
  },
});
