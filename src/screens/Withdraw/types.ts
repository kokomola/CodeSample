import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AmirWalletStackParamList } from 'src/navigator/WalletNavigator';

type WithdrawScreenNavigationProp = StackNavigationProp<
  AmirWalletStackParamList,
  'Withdraw'
>;

type WithdrawScreenRouteProp = RouteProp<AmirWalletStackParamList, 'Withdraw'>;

export type WithdrawScreenProps = {
  navigation: WithdrawScreenNavigationProp;
  route: WithdrawScreenRouteProp;
};
