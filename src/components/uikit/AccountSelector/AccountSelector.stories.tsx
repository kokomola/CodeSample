import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { AccountSelector } from './index';
import { AccountSelectorPagination } from './Pagination';

const wallets = [
  {
    fund: 'btc_wallet',
    balance: {
      fund: 'btc_wallet',
      sum: '10',
    },
    entries: {
      address: '0x000',
      type: 'bitcoin',
      fund: 'btc_wallet',
    },
    incomes: [],
  },
  {
    fund: 'eth_wallet',
    balance: {
      fund: 'eth_wallet',
      sum: '100',
    },
    entries: {
      address: '0x000',
      type: 'ethereum',
      fund: 'eth_wallet',
    },
    incomes: [],
  },
  {
    fund: 'usdt_wallet',
    balance: {
      fund: 'usdt_wallet',
      sum: '1000',
    },
    entries: {
      address: '0x000',
      type: 'usdt',
      fund: 'usdt_wallet',
    },
    incomes: [],
  },
];

storiesOf('AccountSelector', module).add('Default', () => (
  <Area>
    <Wrapper title="wallet selector">
      <AccountSelector
        accounts={wallets}
        activeSlide={1}
        onSnapToItem={() => null}
        carouselRef={null}
      />

      <AccountSelectorPagination accounts={wallets} activeSlide={1} />
    </Wrapper>
  </Area>
));
