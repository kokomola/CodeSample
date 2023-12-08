import React from 'react';
import { Store, Event } from 'effector';
import { useStore } from 'effector-react';
import { Text, View } from 'react-native';
import {
  RadioButton,
  RadioButtonsContainer,
} from '@components/uikit/RadioButtons';
import { ProductColor, ProductOption } from '@store/shop/types';
import { styles as s } from './styles';

interface IOptionsProps {
  options: Array<ProductColor | ProductOption>;
  $selectedOptionId: Store<number | null>;
  selectOptionId: Event<number | null>;
  title?: string;
}

export const ShopOptions: React.FC<IOptionsProps> = ({
  options,
  $selectedOptionId,
  selectOptionId,
  title,
}) => {
  const optionId = useStore($selectedOptionId);
  const buttons = options.map((option) => (
    <RadioButton
      key={`title-${option.id}`}
      img={typeof option.image_url === 'string' ? option.image_url : ''}
      text={'name' in option ? option?.name : undefined}
      onPress={() => selectOptionId(option.id)}
      active={option.id === optionId}
    />
  ));

  const option = options.find((c) => c.id === optionId);
  if (!options || !option) return null;

  let header = '';
  if ('title' in option) {
    header = `${title}: ${option.title}`;
  }
  if ('name' in option) {
    header = `${option.param_name || 'Параметр'}: ${option.name}`;
  }

  return (
    <View style={s.options}>
      <Text style={[s.title, s.optionTitle]}>{header}</Text>
      <RadioButtonsContainer>{buttons}</RadioButtonsContainer>
    </View>
  );
};
