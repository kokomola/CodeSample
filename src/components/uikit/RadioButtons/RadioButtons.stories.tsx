import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { RadioButton, RadioButtonsContainer } from './index';

storiesOf('Radio Buttons', module).add('Primary', () => (
  <Area>
    <Wrapper title="With icon">
      <RadioButtonsContainer>
        <RadioButton icon="busd" text="BUSD" onPress={console.log} />
        <RadioButton icon="usdc" text="USDC" onPress={console.log} />
        <RadioButton icon="usdt" text="USDT" onPress={console.log} />
      </RadioButtonsContainer>
    </Wrapper>

    <Wrapper title="Without icon">
      <RadioButtonsContainer>
        <RadioButton text="USDC" onPress={console.log} active />
        <RadioButton text="USDT" onPress={console.log} />
        <RadioButton text="USDX" onPress={console.log} />
      </RadioButtonsContainer>
    </Wrapper>
  </Area>
));
