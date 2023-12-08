import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { Spinner } from './index';

storiesOf('Spinner', module)
  .add('Library', () => (
    <Area>
      <Wrapper title="Small">
        <Spinner icon="spinner" size="sm" />
      </Wrapper>

      <Wrapper title="Medium">
        <Spinner icon="spinner" />
      </Wrapper>

      <Wrapper title="Large">
        <Spinner icon="spinner" size="lg" />
      </Wrapper>

      <Wrapper title="Huge">
        <Spinner icon="spinner" size="xl" />
      </Wrapper>

      <Wrapper title="Custom color">
        <Spinner icon="spinner" size="xl" color="#00F6FA" />
      </Wrapper>
    </Area>
  ));

