import {DynamicValue} from 'react-native-dynamic';
import {IconName} from '@components/uikit/Icon';
import {ViewStyle} from 'react-native';
import React from 'react';
//import { buttonKinds } from '.';

export type TButtonKinds = {
  RegularButton: React.ReactNode;
  SheetButton: React.ReactNode;
  Pressable: React.ReactNode;
};

export type TButton = {
  kind?: keyof TButtonKinds;
  text: string | null;
  type?: 'primary' | 'secondary' | 'ghost' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  onPress: (e: React.SyntheticEvent) => void;
  icon?: IconName | null;
  rightIcon?: IconName | null;
  fill?: boolean;
  customStyle?: ViewStyle;
};

export type TDynamicStyle = {
  button: {
    backgroundColor: DynamicValue<string>;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
    alignSelf: string;
    padding: number;
    borderRadius: number;
  };
  text: {
    color: DynamicValue<string>;
    height: number;
    lineHeight: number;
    paddingHorizontal: number;
  };
};
