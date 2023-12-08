import React from 'react';
import { useTranslation } from 'react-i18next';

import { ScrollView, Text, View } from 'react-native';

import { TokenSaleAvailablePaymentsProps } from './types';
import { styles as s } from './styles';
import { Button } from '@components/uikit';
import { updateToken } from '@store/tokenSaleEdit';
import { CircleRadioButton } from '@components/uikit/CircleRadioButtons';
import { options } from 'src/screens/TokenSaleBuy';
import { Currencies } from '@store/tokenSale/type';
import { InputError } from '@components/uikit/InputError';

export const TokenSaleAvailablePayments: React.FC<TokenSaleAvailablePaymentsProps> = (
  props
) => {
  const { availablePayments, tokenId } = props;

  const [t] = useTranslation('TokenSaleEdit');

  const [radiobuttonOption, setRadiobuttonOption] = React.useState(
    availablePayments || []
  );

  const error =
    radiobuttonOption.filter((c) =>
      options.map(({ value }) => value).includes(c.toUpperCase() as Currencies)
    ).length === 0;

  const handleChange = (option: string) => () => {
    const selectedOptions = [...radiobuttonOption];
    const index = selectedOptions.indexOf(option);
    if (index === -1) {
      selectedOptions.push(option);
    } else {
      selectedOptions.splice(index, 1);
    }
    setRadiobuttonOption(selectedOptions);
  };

  return (
    <View>
      <Text style={s.title2}>{t('availablePayments')}</Text>
      <ScrollView contentContainerStyle={s.innerScrollView}>
        {options.map((item, index) => (
          <CircleRadioButton
            id={item.value}
            label={item.label}
            key={index}
            selected={
              radiobuttonOption.find(
                (option) => option === item.value.toLowerCase()
              ) !== undefined
            }
            onPress={handleChange(item.value.toLowerCase())}
          />
        ))}
      </ScrollView>
      <Text>{error}</Text>
      {error && <InputError error={t('atLeastSelectOne')} />}

      <Button
        text={t('save')}
        disabled={error}
        onPress={() =>
          updateToken({
            id: tokenId,
            body: { availablePayments: radiobuttonOption },
          })
        }
        customStyle={s.button}
      />
    </View>
  );
};
