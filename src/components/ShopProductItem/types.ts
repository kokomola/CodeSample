import {Product} from '@store/shop/types';
import {ReactNode} from 'react';

export type ShopProductItemProps = {
  title: string;
  isNew?: boolean;
  isVip: Product['is_vip'];
  imageUri?: string | null;
  small?: boolean;
  children: ReactNode;
};
