import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamList } from 'src/navigator/TransferNavigator';

type TransferToSavingScreenNavigationProp = StackNavigationProp<
  TransferStackParamList,
  'TransferToSaving'
>;

type TransferToSavingScreenRouteProp = RouteProp<
  TransferStackParamList,
  'TransferToSaving'
>;

export type TransferToSavingScreenProps = {
  navigation: TransferToSavingScreenNavigationProp;
  route: TransferToSavingScreenRouteProp;
};
