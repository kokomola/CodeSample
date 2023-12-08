import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { CircleRadioButton } from './index';

function RegularCircleRadioButton() {
  const [selected, setSelected] = useState('l1');

  return (
    <Wrapper title="Circle radio button">
      <CircleRadioButton
        id="1"
        onPress={() => setSelected('l1')}
        label="Case one"
        selected={selected === 'l1'}
      />
      <CircleRadioButton
        id="2"
        onPress={() => setSelected('l2')}
        label="Case two"
        selected={selected === 'l2'}
      />
      <CircleRadioButton
        id="3"
        onPress={() => setSelected('l3')}
        label="Case three"
        selected={selected === 'l3'}
        disabled
      />
    </Wrapper>
  );
}

storiesOf('Circle Radio Buttons', module).add('Primary', () => (
  <Area>
    <RegularCircleRadioButton />
  </Area>
));
