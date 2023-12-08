import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ScrollView, Text, View } from 'react-native';

import {
  RadioButton,
  RadioButtonsContainer,
} from '@components/uikit/RadioButtons';
import { Button } from '@components/uikit';
import { CircleRadioButton } from '@components/uikit/CircleRadioButtons';

import { useCheckboxAllSelector } from '@utils/useCheckboxAllSelector';

import { updateToken } from '@store/tokenSaleEdit';

import { styles as s } from './styles';
import { ParticipantsProps } from './types';

const sunriseItems = [
  { value: 'all', label: 'Sunrise Program' },
  { value: 'zero', label: 'Zero' },
  { value: 'bronze', label: 'Spark' },
  { value: 'silver', label: 'Ray' },
  { value: 'gold', label: 'Light' },
  { value: 'platinum', label: 'Shine' },
  { value: 'brilliant', label: 'Sun' },
];

const ambassadorItems = [
  { value: 'all', label: 'Ambassador Program' },
  { value: 100, label: 'Ambassador (A)' },
  { value: 200, label: 'Regional Ambassador (R.A.)' },
  { value: 300, label: 'International Ambassador (I.A.)' },
  { value: 400, label: 'TOP Ambassador (T.A.)' },
  { value: 500, label: 'Board Ambassador (B.M.)' },
];

export const TokenSaleParticipants: React.FC<ParticipantsProps> = (props) => {
  const { navigation, tokenId } = props;

  const { t } = useTranslation('TokenSaleEdit');

  const tabs = [
    {
      label: t('allUsers'),
      value: 'all_users',
      active: false,
    },
    {
      label: t('selectUserCategory'),
      value: 'select_user_category',
      active: false,
    },
  ];
  const [tab, setTab] = useState('all_users');

  const [
    availableUserSunriseStatus,
    setAvailableUserSunriseStatus,
    handleOnChangeSunrise,
  ] = useCheckboxAllSelector({
    initialState: [props.availableUserSunriseStatus],
    items: sunriseItems,
  });

  const [
    availableUserAmbassadorLevel,
    setAvailableUserAmbassadorLevel,
    handleOnChangeAmbassador,
  ] = useCheckboxAllSelector({
    initialState: [props.availableUserAmbassadorLevel],
    items: ambassadorItems,
  });

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (props.availableUserSunriseStatus) {
        setAvailableUserSunriseStatus(props.availableUserSunriseStatus);
        setAvailableUserAmbassadorLevel(props.availableUserAmbassadorLevel);
      }
    });
  }, [
    props.availableUserSunriseStatus,
    props.availableUserAmbassadorLevel,
    setAvailableUserSunriseStatus,
    setAvailableUserAmbassadorLevel,
    navigation,
  ]);

  React.useEffect(() => {
    if (
      availableUserAmbassadorLevel.length === ambassadorItems.length - 1 &&
      availableUserSunriseStatus.length === sunriseItems.length - 1
    ) {
      setTab('all_users');
    } else {
      setTab('select_user_category');
    }
  }, [availableUserSunriseStatus, availableUserAmbassadorLevel]);

  React.useEffect(() => {
    if (tab === 'all_users') {
      setAvailableUserSunriseStatus([
        ...sunriseItems
          .filter(({ value }) => value !== 'all')
          .map(({ value }) => value),
      ]);
      setAvailableUserAmbassadorLevel([
        ...ambassadorItems
          .filter(({ value }) => value !== 'all')
          .map(({ value }) => value),
      ]);
    }
  }, [tab, setAvailableUserSunriseStatus, setAvailableUserAmbassadorLevel]);

  return (
    <View style={s.wrapperForScrollView}>
      <Text style={s.title2}>{t('participantsTitle')}</Text>

      <Text style={s.text}>{t('whoCanBuyTokens')}</Text>

      <RadioButtonsContainer containerStyle={s.buttonBox}>
        {tabs.map((o, index) => (
          <RadioButton
            key={`item-${index}`}
            onPress={() => setTab(o.value)}
            text={o.label}
            active={o.value === tab}
          />
        ))}
      </RadioButtonsContainer>

      <ScrollView contentContainerStyle={s.innerScrollView}>
        {sunriseItems.map((item, index) => (
          <CircleRadioButton
            id={item.value}
            label={item.label}
            key={index}
            selected={
              availableUserSunriseStatus.includes(item.value) ||
              availableUserSunriseStatus.length === sunriseItems.length - 1
            }
            onPress={handleOnChangeSunrise}
          />
        ))}

        {ambassadorItems.map((item, index) => (
          <CircleRadioButton
            id={item.value}
            label={item.label}
            key={index}
            selected={
              availableUserAmbassadorLevel.includes(item.value) ||
              availableUserAmbassadorLevel.length === ambassadorItems.length - 1
            }
            onPress={handleOnChangeAmbassador}
          />
        ))}
      </ScrollView>

      <Button
        text={t('save')}
        onPress={() =>
          updateToken({
            id: tokenId,
            body: {
              availableUserSunriseStatus,
              availableUserAmbassadorLevel,
            },
          })
        }
        customStyle={s.button}
      />
    </View>
  );
};
