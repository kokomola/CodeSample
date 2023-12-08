import { SvgProps } from 'react-native-svg';
import BigNumber from 'bignumber.js';

import { Fund } from '@constants/funds';
import { Coin } from '@store/coin-network/types';

export type CoinSelect = {
  idx: number;
  textBeforeTitle: string;
  balance: BigNumber;
  translate: string;
  SvgIcon?: React.FC<SvgProps>;
  uri?: string;
  color: string;
  fund?: Fund;
  coin: Coin | string;
};

export type ActiveSlide = number;

export type CoinSelectorProps = {
  coins: CoinSelect[];
  activeSlide: ActiveSlide;
  onSnapToItem: (index: number) => void;
  sliderWidth?: number;
  itemWidth?: number;
  carouselRef: any;
  scrollEnabled?: boolean;
  textBeforeTitle?: string;
};

export type PaginationProps = {
  coins: CoinSelectorProps['coins'];
  activeSlide: ActiveSlide;
};

export type CoinProps = {
  item: CoinSelect;
  index: number;
  textBeforeTitle?: string;
};
