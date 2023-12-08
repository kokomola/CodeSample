import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamList } from 'src/navigator/TransferNavigator';

type TransferMenuScreenNavigationProp = StackNavigationProp<
  TransferStackParamList,
  'TransferMenu'
>;

type TransferMenuScreenRouteProp = RouteProp<
  TransferStackParamList,
  'TransferMenu'
>;

export type TransferMenuScreenProps = {
  navigation: TransferMenuScreenNavigationProp;
  route: TransferMenuScreenRouteProp;
};
