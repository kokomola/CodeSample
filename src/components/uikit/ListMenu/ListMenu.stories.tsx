import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area, Wrapper } from '../../StorybookComponents';

import { ListMenu } from './index';

storiesOf('ListMenu', module).add('Primary', () => (
  <Area>
    <Wrapper title="Default">
      <ListMenu
        menu={[
          { icon: 'logout', text: 'Logout', onPress: console.log },
          { icon: 'language', text: 'Language', onPress: console.log },
          {
            icon: 'shield',
            text:
              '2 factor auth 2 factor auth 2 factor auth 2 factor auth 2 factor auth 2 factor auth',
            onPress: console.log,
            active: true,
          },
          { icon: 'percent', text: 'Reinvestment', onPress: console.log },
          { icon: 'lockOpen', text: 'Change password', onPress: console.log },
          { icon: 'at', text: 'Change email', onPress: console.log },
        ]}
      />
    </Wrapper>
  </Area>
));
