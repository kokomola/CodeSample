import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

export type TokenSaleEditProgramProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: { params: { id: number } };
};

export type EditInfoRowProps = {
  value: string;
  title: string;
  onPress: () => any;
};
