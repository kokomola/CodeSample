import { Product } from '@store/shop/types';

export type ShopProductsPageItemProps = {
  title: string;
  isNew?: boolean;
  isVip: Product['is_vip'];
  price: number;
  onPress?: () => void;
  onCartPress?: () => void;
  cart?: boolean;
  imageUri?: string | null;
  small?: boolean;
};
