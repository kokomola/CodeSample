import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import Slider from '../../common/Slider';
import { Button } from '@components/uikit/Button';

import { styles as s } from './styles';

import {
  focusReinvestmentView,
  $savingBtc,
  $savingEth,
  $savingUsdt,
  $partner,
  $stable,
  changeSavingBtc,
  blurReinvestmentView,
  changeSavingEth,
  changeSavingUsdt,
  changeStable,
  changePartner,
  save,
  updateReinvestmentFx,
} from '@store/reinvestment';

const ReinvestmentForm = () => {
  const [t] = useTranslation('ReinvestmentForm');
  const navigation = useNavigation();

  const savingBtc = useStore($savingBtc);
  const savingEth = useStore($savingEth);
  const savingUsdt = useStore($savingUsdt);
  const partner = useStore($partner);
  const stable = useStore($stable);
  const loading = useStore(updateReinvestmentFx.pending);

  React.useEffect(
    () => navigation.addListener('focus', () => focusReinvestmentView()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurReinvestmentView()),
    [navigation]
  );

  return (
    <View>
      <View style={s.sliderBox}>
        <Text style={s.sliderLabel}>{t('fromSavingsBtc')}</Text>
        <Slider
          value={savingBtc}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onChange={changeSavingBtc}
        />
        <View style={s.sliderValues}>
          <Text style={s.sliderValueText}>
            {t('wallet')}: {`${100 - savingBtc} %`}
          </Text>
          <Text style={s.sliderValueText}>
            {t('reinvestment')}: {`${savingBtc} %`}
          </Text>
        </View>
      </View>

      <View style={s.sliderBox}>
        <Text style={s.sliderLabel}>{t('fromSavingsEth')}</Text>
        <Slider
          value={savingEth}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onChange={changeSavingEth}
        />
        <View style={s.sliderValues}>
          <Text style={s.sliderValueText}>
            {t('wallet')}: {`${100 - savingEth} %`}
          </Text>
          <Text style={s.sliderValueText}>
            {t('reinvestment')}: {`${savingEth} %`}
          </Text>
        </View>
      </View>

      <View style={s.sliderBox}>
        <Text style={s.sliderLabel}>{t('fromSavingsUsdt')}</Text>
        <Slider
          value={savingUsdt}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onChange={changeSavingUsdt}
        />
        <View style={s.sliderValues}>
          <Text style={s.sliderValueText}>
            {t('wallet')}: {`${100 - savingUsdt} %`}
          </Text>
          <Text style={s.sliderValueText}>
            {t('reinvestment')}: {`${savingUsdt} %`}
          </Text>
        </View>
      </View>

      <View style={s.sliderBox}>
        <Text style={s.sliderLabel}>{t('fromStable')}</Text>
        <Slider
          value={stable}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onChange={changeStable}
        />
        <View style={s.sliderValues}>
          <Text style={s.sliderValueText}>
            {t('wallet')}: {`${100 - stable} %`}
          </Text>
          <Text style={s.sliderValueText}>
            {t('reinvestment')}: {`${stable} %`}
          </Text>
        </View>
      </View>

      <View style={s.sliderBox}>
        <Text style={s.sliderLabel}>{t('fromReferrals')}</Text>
        <Slider
          value={partner}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onChange={changePartner}
        />
        <View style={s.sliderValues}>
          <Text style={s.sliderValueText}>
            {t('wallet')}: {`${100 - partner} %`}
          </Text>
          <Text style={s.sliderValueText}>
            {t('reinvestment')}: {`${partner} %`}
          </Text>
        </View>
      </View>

      <View style={s.button}>
        <Button text={t('save')} onPress={save} loading={loading} />
      </View>
    </View>
  );
};

export default ReinvestmentForm;
