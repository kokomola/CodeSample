import { Wallet, Saving } from '@store/wallets/types';

export type Account = Wallet | Saving;
export type ActiveSlide = number;

export type AccountSelectorProps = {
  accounts: Account[];
  activeSlide: ActiveSlide;
  onSnapToItem: (index: number) => void;
  sliderWidth?: number;
  itemWidth?: number;
  carouselRef: any;
  scrollEnabled?: boolean;
  textBeforeTitle?: string;
};

export type PaginationProps = {
  accounts: AccountSelectorProps['accounts'];
  activeSlide: ActiveSlide;
};

export type AccountProps = {
  item: Account;
  index: number;
  textBeforeTitle?: string;
};
