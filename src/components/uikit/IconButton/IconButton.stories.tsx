import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { IconButton } from './index';

storiesOf('IconButton', module).add('Default', () => (
  <Area>
    <Wrapper title="wallet selector">
      <IconButton
        onPress={() => null}
        color="#8c46ff"
        icon="flare"
        disabled={false}
      />
    </Wrapper>
  </Area>
));
