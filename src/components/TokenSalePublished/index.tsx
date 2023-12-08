import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from 'react-native';

import { Icon } from '@components/uikit/Icon';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

import { purple500 } from '@constants/colors';

import { styles as s } from './styles';
import { TokenSalePublishedProps } from './types';
import { Button } from '@components/uikit';
import { updateToken } from '@store/tokenSaleEdit';

export const TokenSalePublished: React.FC<TokenSalePublishedProps> = (
  props
) => {
  const { isPublished, tokenId } = props;

  const [t] = useTranslation('TokenSaleEdit');

  const initialValue = isPublished === true ? 'yes' : 'no';

  const options = ['yes', 'no'];

  const [radiobuttonOption, setRadiobuttonOption] = React.useState(
    initialValue
  );

  const newValue = radiobuttonOption === 'yes' ? true : false;

  return (
    <View>
      <Text style={s.title2}>{t('isPublished')}</Text>

      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => setRadiobuttonOption(option)}
          key={`${option}-${index}`}
          style={s.publishedBox}
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
          updateToken({ id: tokenId, body: { isPublished: newValue } })
        }
        customStyle={s.button}
      />
    </View>
  );
};
