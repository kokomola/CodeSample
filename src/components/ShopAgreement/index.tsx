import React from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, CheckBox } from '@components/uikit';
import {
  $isCheckedShopAgree,
  acceptShopAgree,
  agreeShopTermsFx,
  cancelShopAgree,
  toggleShopAgree,
} from '@store/shop/agreement';
import { SHOP_AGREE_RU } from 'src/config';
import { useStore } from 'effector-react';
import { useOpenUrl } from 'src/hooks/useOpenUrl';
import { styles as s } from './styles';

export const ShopAgreement = () => {
  const [t] = useTranslation('ShopDomain');
  const openUrl = useOpenUrl(SHOP_AGREE_RU!);

  const isCheckedAgreed = useStore($isCheckedShopAgree);
  const loading = useStore(agreeShopTermsFx.pending);

  return (
    <View style={s.box}>
      <Text style={s.title}>{t('sollarGiftRulesTitle')}</Text>

      <View style={s.agreeBox}>
        <CheckBox checked={isCheckedAgreed} onPress={toggleShopAgree} />
        <Text style={s.agreeText}>
          {t('sollarGiftRules1')}
          <Text style={s.link} onPress={openUrl}>
            {t('sollarGiftRules2')}
          </Text>
          {t('sollarGiftRules3')}
        </Text>
      </View>

      <View style={s.btnBox}>
        <View style={s.btnWrapper}>
          <Button
            kind="SheetButton"
            type="secondary"
            text={t('no')}
            onPress={() => cancelShopAgree()}
          />
        </View>
        <View style={s.btnWrapper}>
          <Button
            disabled={!isCheckedAgreed}
            loading={loading}
            kind="SheetButton"
            type="secondary"
            text={t('yes')}
            onPress={() => acceptShopAgree()}
          />
        </View>
      </View>
    </View>
  );
};
