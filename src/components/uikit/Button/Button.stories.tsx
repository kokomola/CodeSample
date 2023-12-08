import React from 'react';
import { Button as ReactButton } from 'react-native';
import { useCallback, useMemo, useRef } from 'react';
import { storiesOf } from '@storybook/react-native';
import 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

import { Area, Wrapper } from '../../StorybookComponents';

import { Button } from './index';
import { ButtonSheet } from '../ButtonSheet';

storiesOf('Button', module)
  .add('Primary', () => {
    return (
      <Area>
        <Wrapper title="One">
          <Button
            kind="Pressable"
            text="Pressable"
            onPress={() => console.log('Pressable button')}
          />
        </Wrapper>

        <Wrapper title="Two">
          <Button
            kind="RegularButton"
            text="Regular Button"
            onPress={() => console.log('Regular button')}
          />
        </Wrapper>

        <Wrapper>
          <BottomSheet snapPoints={['25%', '60%', '90%']}>
            <Button
              kind="SheetButton"
              text="Dasha"
              onPress={() => console.log('Sheet')}
            />
          </BottomSheet>
        </Wrapper>

        <ReactButton
          title="Simple Button"
          onPress={() => console.log('heelow')}
        />

        <Wrapper title="Default with left icon">
          <Button text="Default" icon="btc" />
        </Wrapper>

        <Wrapper title="Auto width">
          <Button text="Auto width" fill={false} />
        </Wrapper>

        <Wrapper title="Auto width with left icon">
          <Button text="Auto width" fill={false} icon="chevronDoubleRight" />
        </Wrapper>

        <Wrapper title="Only icon">
          <Button icon="chevronDoubleRight" />
        </Wrapper>

        <Wrapper title="Auto width only icon">
          <Button fill={false} icon="chevronDoubleRight" />
        </Wrapper>

        <Wrapper title="Disabled">
          <Button text="Disabled" disabled />
        </Wrapper>

        <Wrapper title="Disabled with right icon">
          <Button text="Disabled" disabled rightIcon="chevronDoubleRight" />
        </Wrapper>

        <Wrapper title="Loading">
          <Button loading />
        </Wrapper>

        <Wrapper title="Loading auto width">
          <Button fill={false} loading />
        </Wrapper>
      </Area>
    );
  })
  .add('Secondary', () => (
    <Area>
      <Wrapper title="Default">
        <Button type="secondary" text="Default" />
      </Wrapper>

      <Wrapper title="Default with left icon">
        <Button type="secondary" text="Default" icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Auto width">
        <Button type="secondary" text="Auto width" fill={false} />
      </Wrapper>

      <Wrapper title="Auto width with left icon">
        <Button
          type="secondary"
          text="Auto width"
          fill={false}
          icon="chevronDoubleRight"
        />
      </Wrapper>

      <Wrapper title="Only icon">
        <Button type="secondary" icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Auto width only icon">
        <Button type="secondary" fill={false} icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Disabled">
        <Button type="secondary" text="Disabled" disabled />
      </Wrapper>

      <Wrapper title="Disabled with right icon">
        <Button
          type="secondary"
          text="Disabled"
          disabled
          rightIcon="chevronDoubleRight"
        />
      </Wrapper>
    </Area>
  ))
  .add('Ghost', () => (
    <Area>
      <Wrapper title="Default">
        <Button type="ghost" text="Default" />
      </Wrapper>

      <Wrapper title="Default with left icon">
        <Button type="ghost" text="Default" icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Auto width">
        <Button type="ghost" text="Auto width" fill={false} />
      </Wrapper>

      <Wrapper title="Auto width with left icon">
        <Button
          type="ghost"
          text="Auto width"
          fill={false}
          icon="chevronDoubleRight"
        />
      </Wrapper>

      <Wrapper title="Only icon">
        <Button type="ghost" icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Auto width only icon">
        <Button type="ghost" fill={false} icon="chevronDoubleRight" />
      </Wrapper>

      <Wrapper title="Disabled">
        <Button type="ghost" text="Disabled" disabled />
      </Wrapper>

      <Wrapper title="Disabled with right icon">
        <Button
          type="ghost"
          text="Disabled"
          disabled
          rightIcon="chevronDoubleRight"
        />
      </Wrapper>

      <Wrapper title="Loading">
        <Button type="ghost" loading />
      </Wrapper>

      <Wrapper title="Loading auto width">
        <Button type="ghost" fill={false} loading />
      </Wrapper>
    </Area>
  ));
