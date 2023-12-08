import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { ActionsPanel } from './index';

storiesOf('ActionsPanel', module).add('Default', () => (
  <Area>
    <Wrapper title="4 actions">
      <ActionsPanel
        actions={[
          {
            icon: 'gift',
            onPress: () => console.log('pressed gift'),
            label: 'Gift',
          },
          {
            icon: 'exchange',
            onPress: () => console.log('pressed exchange'),
            label: 'Exchange',
          },
          {
            icon: 'dark',
            onPress: () => console.log('pressed dark'),
            label: 'Dark',
          },
          {
            icon: 'lineChart',
            onPress: () => console.log('pressed lineChart'),
            label: 'Line chart',
          },
        ]}
      />
    </Wrapper>

    <Wrapper title="3 actions">
      <ActionsPanel
        actions={[
          {
            icon: 'gift',
            onPress: () => console.log('pressed gift'),
            label: 'Gift',
          },
          {
            icon: 'exchange',
            onPress: () => console.log('pressed exchange'),
            label: 'Exchange',
          },
          {
            icon: 'dark',
            onPress: () => console.log('pressed dark'),
            label: 'Dark',
          },
        ]}
      />
    </Wrapper>

    <Wrapper title="Disabled">
      <ActionsPanel
        actions={[
          {
            icon: 'gift',
            onPress: () => console.log('pressed gift'),
            label: 'Gift',
          },
          {
            icon: 'exchange',
            onPress: () => console.log('pressed exchange'),
            label: 'Exchange',
            disabled: true,
          },
          {
            icon: 'dark',
            onPress: () => console.log('pressed dark'),
            label: 'Dark',
            disabled: true,
          },
        ]}
      />
    </Wrapper>
  </Area>
));
