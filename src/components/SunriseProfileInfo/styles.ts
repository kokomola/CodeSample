import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: '9%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '2%',
    marginBottom: '3%',
    color: 'black',
  },
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  profileButton: {
    paddingVertical: 20,
  },
  profileText: {
    fontWeight: 'bold',
    color: 'black',
  },
  profileTextValue: {
    flex: 1,
    maxWidth: '50%',
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'black',
  },
  pointsInfo: {
    lineHeight: 21,
  },
  profileSvText: {
    fontSize: 13,
    color: 'black',
  },
});
