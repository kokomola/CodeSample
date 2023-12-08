import * as React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { styles as s } from './styles';
import { useTranslation } from 'react-i18next';
import { noTxsMockXml } from '@components/AccountLayout/img/no-txs-mock';

type BalanceBoxProps = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const BalanceBox: React.FC<BalanceBoxProps> = (props) => {
  const { children, containerStyle } = props;

  return <View style={[s.balanceBox, containerStyle]}>{children}</View>;
};

type ActionsPanelBoxProps = {
  children: React.ReactNode;
};

export const ActionsPanelBox: React.FC<ActionsPanelBoxProps> = (props) => {
  const { children } = props;

  return <View style={s.actionsPanelBox}>{children}</View>;
};

type DetailsBoxProps = {
  children: React.ReactNode;
  title?: string;
};

export const DetailsBox: React.FC<DetailsBoxProps> = (props) => {
  const { children, title } = props;

  return (
    <View style={s.detailsBox}>
      {!!title && <Text style={s.sectionTitle}>{title}</Text>}
      {children}
    </View>
  );
};

type TxsBoxProps = {
  children: React.ReactNode;
  title: string;
};

export const TxsBox: React.FC<TxsBoxProps> = (props) => {
  const { children, title } = props;

  return (
    <View style={s.txsBox}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export const NoTxsMock: React.FC = () => {
  const [t] = useTranslation('AccountLayout');

  return (
    <View style={s.noTxsMockBox}>
      <SvgXml xml={noTxsMockXml} />
      <Text style={s.noTxsText}>{t('noTxsMockText')}</Text>
    </View>
  );
};
