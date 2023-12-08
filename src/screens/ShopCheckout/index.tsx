import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { InputError } from '@components/uikit/InputError';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit';
import { ShopCheckoutTextField } from '@components/ShopCheckoutTextField/ShopCheckoutTextField';

import {
  $isFormValid,
  $isOrderInFocus,
  $recipientAddressErrors,
  $recipientInfoErrors,
  focusOrderInfo,
  submitOrder,
  submitOrderFx,
} from '@store/shopCheckout';
import { blurShopCheckoutScreen, focusShopCheckoutScreen } from '@store/app';

import { InputsOrderTypes } from '@components/ShopCheckoutTextField/types';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { IScreenProps } from 'src/common/types';
import { styles as s } from './styles';
import { $didUserAgreeShop } from '@store/shop/agreement';
import { ShopAgreeScreen } from '../ShopAgreeScreen';

export const ShopCheckout: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const isLoading = useStore(submitOrderFx.pending);
  const orderInfoInFocus = useStore($isOrderInFocus);
  const isFormValid = useStore($isFormValid);

  const recipientInfoErrors = useStore($recipientInfoErrors);
  const recipientAddressErrors = useStore($recipientAddressErrors);
  const didUserAgree = useStore($didUserAgreeShop);

  const { t } = useTranslation('ShopCheckout');

  const inputs: InputsOrderTypes[] = [
    { type: 'userSurname', placeholder: `${t('surname')}`, maxLength: 35 },
    { type: 'userName', placeholder: `${t('name')}`, maxLength: 35 },
    { type: 'patronymic', placeholder: `${t('patronymic')}`, maxLength: 35 },
    {
      type: 'phone',
      placeholder: `${t('phoneNumber')}`,
      maxLength: 15,
      keyboardType: 'phone-pad',
    },
    { type: 'country', placeholder: `${t('country')}`, maxLength: 45 },
    { type: 'city', placeholder: `${t('city')}`, maxLength: 35 },
    {
      type: 'postCode',
      placeholder: `${t('postalCode')}`,
      maxLength: 20,
      keyboardType: 'phone-pad',
    },
    { type: 'street', placeholder: `${t('street')}`, maxLength: 40 },
  ];

  React.useEffect(() => {
    navigation.addListener('focus', () => focusShopCheckoutScreen());
    navigation.addListener('blur', () => blurShopCheckoutScreen());
  }, [navigation]);

  if (!didUserAgree) {
    return <ShopAgreeScreen />;
  }

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <BackButton text={t('screenTitle')} />
        <ScrollView style={s.sv}>
          <Text style={s.title}>{t('recipientDetails')}</Text>

          {inputs.slice(0, 4).map((input) => (
            <ShopCheckoutTextField
              key={input.type}
              maxLength={input.maxLength}
              onFocus={focusOrderInfo}
              placeholder={input.placeholder}
              type={input.type}
              keyboardType={input.keyboardType}
            />
          ))}

          <InputError
            style={s.inputError}
            error={recipientInfoErrors[0]}
            visible={orderInfoInFocus}
          />

          <Text style={s.title}>{t('address')}</Text>

          {inputs.slice(4, 8).map((input) => (
            <ShopCheckoutTextField
              key={input.type}
              maxLength={input.maxLength}
              onFocus={focusOrderInfo}
              placeholder={input.placeholder}
              type={input.type}
              keyboardType={input.keyboardType}
            />
          ))}

          <View style={s.inputWrapper}>
            <View style={s.inputContainer}>
              <ShopCheckoutTextField
                maxLength={10}
                onFocus={focusOrderInfo}
                placeholder={t('house')}
                type="house"
                keyboardType="phone-pad"
              />
            </View>
            <View style={s.inputContainer}>
              <ShopCheckoutTextField
                maxLength={10}
                onFocus={focusOrderInfo}
                placeholder={t('apartment')}
                type="apartment"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <InputError
            style={s.inputError}
            error={recipientAddressErrors[0]}
            visible={orderInfoInFocus}
          />
          <Text style={s.title}>{t('other')}</Text>

          <ShopCheckoutTextField
            maxLength={40}
            placeholder={t('comment')}
            type="comments"
          />

          <View style={s.buttonWrapper}>
            <Button
              text={t('submitOrder')}
              onPress={() => submitOrder()}
              loading={isLoading}
              disabled={!isFormValid}
            />
          </View>

          <View style={s.warningContainer}>
            <Text style={s.warningTextTitle}>{t('warningTextTitle')}</Text>
            <Text style={s.warningText}>{t('warningText')}</Text>
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
