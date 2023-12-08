import { ParamListBase } from '@react-navigation/native';
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type SollarWalletScreenProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string>;
};
