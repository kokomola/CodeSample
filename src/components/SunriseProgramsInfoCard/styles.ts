import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  cardContainer: {
    width: 295,
    minHeight: '95%',

    justifyContent: 'center',
    backgroundColor: '#22232d',
    borderRadius: 8,
  },
  cardInnerBox: {
    paddingVertical: '7%', // grow card as text grows
    paddingHorizontal: '5%',

    alignItems: 'center',
  },
  title: {
    marginTop: '6%',
    fontSize: 16,

    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    marginTop: '2%',
    textAlign: 'center',
    fontSize: 12,

    color: '#7a7f8a',
  },
  value: {
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 13,

    fontWeight: 'bold',
    color: 'white',
  },
  valueBig: {
    marginTop: '8%',
  },
});
