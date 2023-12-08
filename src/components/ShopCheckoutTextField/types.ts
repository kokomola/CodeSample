import { KeyboardTypeOptions } from 'react-native';

export type ShopOrderTextFieldProps = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  type:
    | 'userName'
    | 'phone'
    | 'postCode'
    | 'comments'
    | 'country'
    | 'patronymic'
    | 'userSurname'
    | 'city'
    | 'street'
    | 'house'
    | 'apartment';
};

export type InputsOrderTypes = {
  type: ShopOrderTextFieldProps['type'];
  placeholder: string;
  maxLength: number;
  keyboardType?: 'phone-pad' | 'number-pad';
};
