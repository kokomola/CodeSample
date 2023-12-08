import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
    paddingHorizontal: 16,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: '1%',
    color: 'black',
  },
  iconButton: {
    alignItems: 'center',
  },
  moreInfoBlockContainer: {
    marginVertical: '5%',
  },
  //activity indicator styles
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    paddingTop: 10,
  },
});
