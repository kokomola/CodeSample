import * as React from 'react';
import { Pagination } from 'react-native-snap-carousel';

import { styles as s } from './styles';
import { PaginationProps } from './types';

export const AccountSelectorPagination: React.FC<PaginationProps> = (props) => {
  const { accounts, activeSlide } = props;

  return (
    <Pagination
      dotsLength={accounts.length}
      activeDotIndex={activeSlide}
      containerStyle={s.paginationContainer}
      dotStyle={s.paginationDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};
