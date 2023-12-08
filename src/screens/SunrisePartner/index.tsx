import * as React from 'react';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AccountDetailsRow } from '@components/AccountDetailsRow';
import { BackButton } from '@components/layout/BackButton';

import { noneStatus } from '@components/SunriseLevelInfo/img/noneStatus';

import { $children } from '@store/sunriseStructure';
import { getPartnerProgram } from '@store/sunrise/helpers';

import { styles as s } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

interface ISunrisePartnerScreen {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<{ params: { id: number } }, 'params'>;
}

export const SunrisePartner: React.FC<ISunrisePartnerScreen> = (props) => {
  const { route } = props;
  const { id } = route.params;

  const [t] = useTranslation('SunrisePartnerScreen');

  const currentPartner = useStoreMap({
    store: $children,
    keys: [id],
    fn: (partner) => partner.find((w) => w.id === id),
  });

  if (!currentPartner) return null;

  const {
    phone,
    email,
    registration_date: registrationDate,
    status_updated_at: statusObtainedDate,
    name,
    parent_name: parentName,
  } = currentPartner;

  const sunrisePartnerInfoRowMap = [
    {
      label: t('phoneNumber'),
      value: phone || '-',
      hasCopyOnPress: true,
    },
    {
      label: t('email'),
      value: email || '-',
      hasCopyOnPress: true,
    },
    {
      label: t('registrationDate'),
      value:
        registrationDate !== null
          ? format(registrationDate, 'DD-MM-YYYY')
          : t('statusAbsent'),
    },
    {
      label: t('statusDate'),
      value:
        statusObtainedDate !== null
          ? format(statusObtainedDate, 'DD-MM-YYYY')
          : t('statusAbsent'),
    },
    {
      label: t('referrer'),
      value: parentName || '-',
    },
  ];

  const partnerProgram = getPartnerProgram(currentPartner);

  const isPartnerContactsHidden =
    phone === null && email === null ? true : false;

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={`${t('title')} ${name}`} />

      <ScrollView style={s.sv}>
        <View style={s.iconBox}>
          <SvgXml xml={partnerProgram.icon || noneStatus} />
          <Text style={s.levelName}>
            {partnerProgram.name.charAt(0).toUpperCase() +
              partnerProgram.name.slice(1)}
          </Text>
        </View>

        <Text style={s.titlePartnerInfo}>{t('partnerInfo')}</Text>

        {isPartnerContactsHidden
          ? sunrisePartnerInfoRowMap
              .slice(2)
              .map((o) => (
                <AccountDetailsRow
                  key={o.label}
                  label={o.label}
                  value={o.value}
                />
              ))
          : sunrisePartnerInfoRowMap.map((o) => (
              <AccountDetailsRow
                key={o.label}
                label={o.label}
                value={o.value}
                hasCopyOnPress={o.hasCopyOnPress}
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};
