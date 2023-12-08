import { independence500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  titleBox: {
    marginLeft: '4%',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  level: {
    marginTop: '4%',
    fontSize: 12,
    color: independence500,
  },
  iconButton: {
    alignItems: 'center',
  },
});
