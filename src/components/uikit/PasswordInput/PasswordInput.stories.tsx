import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { PasswordInput } from './index';

storiesOf('PasswordInput', module).add('Primary', () => (
  <Area>
    <Wrapper title="Default">
      <PasswordInput />
    </Wrapper>

    <Wrapper title="Focused">
      <PasswordInput focused />
    </Wrapper>

    <Wrapper title="Error">
      <PasswordInput error />
    </Wrapper>

    <Wrapper title="Warning">
      <PasswordInput warning />
    </Wrapper>

    <Wrapper title="Disabled">
      <PasswordInput disabled />
    </Wrapper>
  </Area>
));
