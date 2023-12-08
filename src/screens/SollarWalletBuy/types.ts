import { ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type SollarWalletBuyProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string>;
};
