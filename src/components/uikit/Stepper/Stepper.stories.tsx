import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';
import { Stepper } from './index';
import { View } from 'react-native';

storiesOf('Stepper', module).add('Default', () => (
  <Area>
    <Wrapper title="Compact - default">
      <Stepper
        type="compact"
        count={0}
        onIncrement={() => { }}
        onDecrement={() => { }}
      />
    </Wrapper>
    <Wrapper title="Compact - row">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Stepper
          type="compact"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
        <Stepper
          type="compact"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
        <Stepper
          type="compact"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
      </View>
    </Wrapper>
    <Wrapper title="Large - default">
      <Stepper
        type="large"
        count={0}
        onIncrement={() => { }}
        onDecrement={() => { }}
      />
    </Wrapper>
    <Wrapper title="Large - row">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Stepper
          type="large"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
        <Stepper
          type="large"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
        <Stepper
          type="large"
          count={0}
          onIncrement={() => { }}
          onDecrement={() => { }}
        />
      </View>
    </Wrapper>
  </Area>
));
