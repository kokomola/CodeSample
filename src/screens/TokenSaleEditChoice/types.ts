import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

type EditChoice =
  | 'price'
  | 'participants'
  | 'availablePayments'
  | 'availablePaySol'
  | 'isPublished';

export interface TokenSaleEditProgramProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: { params: { id: number; editChoice: EditChoice } };
}
