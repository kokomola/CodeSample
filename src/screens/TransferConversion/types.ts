import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransferStackParamList } from 'src/navigator/TransferNavigator';

type TransferConversionScreenNavigationProp = StackNavigationProp<
  TransferStackParamList,
  'TransferConversion'
>;

type TransferConversionScreenRouteProp = RouteProp<
  TransferStackParamList,
  'TransferConversion'
>;

export type TransferConversionScreenProps = {
  navigation: TransferConversionScreenNavigationProp;
  route: TransferConversionScreenRouteProp;
};
