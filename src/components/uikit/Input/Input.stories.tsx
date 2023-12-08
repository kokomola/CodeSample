import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { Input } from './index';

storiesOf('Input', module).add('Primary', () => (
  <Area>
    <Wrapper title="Align Center - One">
      <Input
        textAlign="center"
        placeholder="Enter text to the center - cursor don't jump"
      />
    </Wrapper>

    <Wrapper title="Default">
      <Input />
    </Wrapper>

    <Wrapper title="Default with right icon">
      <Input icon="eye" />
    </Wrapper>

    <Wrapper title="Default with left icon">
      <Input leftIcon="eye" />
    </Wrapper>

    <Wrapper title="Default with both icons">
      <Input
        icon="eye"
        leftIcon="eyeClosed"
        onPressIcon={() => console.log('pressed!')}
      />
    </Wrapper>

    <Wrapper title="Disabled">
      <Input disabled value="test teset test " />
    </Wrapper>

    <Wrapper title="Error">
      <Input value="raz dva" error />
    </Wrapper>

    <Wrapper title="Warning">
      <Input value="raz dva" warning />
    </Wrapper>

    <Wrapper title="Focused">
      <Input value="raz dva" focused />
    </Wrapper>

    <Wrapper title="Error & Focused">
      <Input value="raz dva" focused error />
    </Wrapper>

    <Wrapper title="Warning & Focused">
      <Input value="raz dva" focused warning />
    </Wrapper>
  </Area>
));
