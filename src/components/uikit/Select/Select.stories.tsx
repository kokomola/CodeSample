import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { Select } from './index';
import { Input } from '@components/uikit/Input';

storiesOf('Select', module).add('Primary', () => (
  <Area>
    <Wrapper title="Default">
      <Input value="test value" />
    </Wrapper>

    <Wrapper title="Default">
      <Select
        useNativeAndroidPickerStyle={false}
        onValueChange={() => null}
        items={[
          { label: 'JavaScript', value: 'js' },
          { label: 'Java', value: 'java' },
        ]}
      />
    </Wrapper>
  </Area>
));
