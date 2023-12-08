import { Order } from '@store/shopHistory/types';

export type OrdersHistoryListHeaderItemProps = {
  status: Order['status'];
  id: number;
};
