import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from 'react-native';

import { Icon } from '@components/uikit/Icon';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

import { purple500 } from '@constants/colors';

import { styles as s } from './styles';
import { TokenSaleForSOLProps } from './types';
import { Button } from '@components/uikit';
import { updateToken } from '@store/tokenSaleEdit';
import { Currencies } from '@store/tokenSale/type';

export const TokenSaleForSOL: React.FC<TokenSaleForSOLProps> = (props) => {
  const { availablePayments, tokenId } = props;

  const [t] = useTranslation('TokenSaleEdit');

  const initialValue = availablePayments
    .map((c) => c.toUpperCase())
    .includes(Currencies.SOL)
    ? 'yes'
    : 'no';

  const options = ['yes', 'no'];

  const [radiobuttonOption, setRadiobuttonOption] = React.useState(
    initialValue
  );

  const newValue =
    radiobuttonOption === 'yes'
      ? Array.from(
          new Set([...availablePayments, Currencies.SOL.toLowerCase()])
        )
      : [
          ...availablePayments.filter(
            (payment) => payment.toUpperCase() !== Currencies.SOL
          ),
        ];

  return (
    <View>
      <Text style={s.title2}>{t('availablePaySol')}</Text>

      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => setRadiobuttonOption(option)}
          key={`${option}-${index}`}
          style={s.saleForSolBox}
        >
          <Text>{t(`${option}`)}</Text>
          <Icon
            icon={radiobuttonOption === option ? 'check' : ''}
            color={purple500}
          />
        </TouchableOpacity>
      ))}

      <Button
        text={t('save')}
        onPress={() =>
          updateToken({
            id: tokenId,
            body: {
              availablePayments: newValue,
            },
          })
        }
        customStyle={s.button}
      />
    </View>
  );
};
