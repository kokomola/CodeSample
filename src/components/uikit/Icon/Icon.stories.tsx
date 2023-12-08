import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Area } from '../../StorybookComponents';

import lib from './lib';
import { Icon, CircleIcon } from './index';
import { StyleSheet, Text, View } from 'react-native';
import * as colors from '@constants/colors';

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'grey',
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 5,
  },
});

storiesOf('Icon', module).add('Library', () => (
  <Area>
    <View style={s.wrap}>
      {(Object.keys(lib) as Array<keyof typeof lib>).map((key) => (
        <View key={key} style={s.box}>
          <View>
            <Icon icon={key} color="#000000" size="lg" />
          </View>
          <Text style={s.title}>{key}</Text>
        </View>
      ))}
    </View>

    <View style={s.wrap}>
      {(Object.keys(lib) as Array<keyof typeof lib>).map((key) => (
        <View key={key} style={s.box}>
          <View>
            <CircleIcon icon={key} color={colors.purple500} inverse />
          </View>
          <Text style={s.title}>{key}</Text>
        </View>
      ))}
    </View>
  </Area>
));
