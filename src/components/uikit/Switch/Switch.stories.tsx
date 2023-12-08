import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles as s } from './styles';

import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { Switch } from './index';

function DefaultSwitch() {
  const [value, setValue] = useState(true);

  useEffect(() => {
    console.log('[default Switcher]', value);
  }, [value]);

  return (
    <Wrapper title="Default">
      <Text style={s.test}>{value ? 'Yes' : 'No'}</Text>
      <Switch onValueChange={setValue} value={value} />
    </Wrapper>
  );
}

storiesOf('Switch', module).add('Primary', () => {
  return (
    <Area>
      <DefaultSwitch />
      <Wrapper title="Not Immediately">
        <Switch
          barHeight={29}
          circleBorderWidth={0}
          circleSize={24}
          switchLeftPx={2}
          switchRightPx={2}
          switchBorderRadius={30}
          backgroundInactive="grey"
          backgroundActive="blue"
          circleActiveColor={'#FFFFFF'}
          circleInactiveColor={'#E5E5E5'}
          switchWidthMultiplier={2}
          changeValueImmediately={false}
          onValueChange={(value) => console.log('current value = ', value)}
        />
      </Wrapper>
    </Area>
  );
});
