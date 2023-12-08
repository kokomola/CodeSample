import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AmirWalletStackParamList } from 'src/navigator/WalletNavigator';

type SollarWalletTxHistoryScreenNavigationProp = StackNavigationProp<
  AmirWalletStackParamList,
  'SollarWalletTxHistory'
>;

type SollarWalletTxHistoryScreenRouteProp = RouteProp<
  AmirWalletStackParamList,
  'SollarWalletTxHistory'
>;

export type SollarWalletTxHistoryScreenProps = {
  navigation: SollarWalletTxHistoryScreenNavigationProp;
  route: SollarWalletTxHistoryScreenRouteProp;
};
