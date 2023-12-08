import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';

export interface IShopHistory {
  navigation: StackNavigationProp<ParamListBase>;
}
export type OrderStatusTypes = {
  key:
    | 'new'
    | 'processing'
    | 'approved'
    | 'cancelled'
    | 'shipping'
    | 'done'
    | 'default';
  label: string;
};
