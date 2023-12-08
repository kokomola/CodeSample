export type ShopCartItemProps = {
  title: string;
  color?: string;
  option?: string;
  price: number;
  count: number;
  imageUri?: string;
  optionName?: string;
  colorName?: string;
  onRemove?: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onPress: () => void;
};
