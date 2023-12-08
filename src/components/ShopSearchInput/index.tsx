import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { Input } from '@components/uikit/Input';
import {
  $search,
  changeSearch,
  resetSearch,
  submitSearch,
  $currentSearchRequest,
} from '@store/shop';

import { styles as s } from './styles';

export const ShopSearchInput: React.FC = () => {
  const { t } = useTranslation('ShopSearchInput');

  const search = useStore($search);
  const currentSearchRequest = useStore($currentSearchRequest);

  return (
    <Input
      value={search}
      onChangeText={changeSearch}
      onPressIcon={submitSearch}
      onSubmitEditing={() => submitSearch()}
      onPressLeftIcon={resetSearch}
      leftIcon={currentSearchRequest ? 'cross' : undefined}
      placeholder={t('search')}
      icon={'search'}
      autoCapitalize="none"
      containerStyle={s.inputBox}
    />
  );
};
