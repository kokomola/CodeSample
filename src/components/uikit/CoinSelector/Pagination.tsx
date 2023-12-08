import * as React from 'react';
import { Pagination } from 'react-native-snap-carousel';

import { styles as s } from './styles';
import { PaginationProps } from './types';

export const CoinSelectorPagination: React.FC<PaginationProps> = (props) => {
  const { coins, activeSlide } = props;

  return (
    <Pagination
      dotsLength={coins.length}
      activeDotIndex={activeSlide}
      containerStyle={s.paginationContainer}
      dotStyle={s.paginationDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};
