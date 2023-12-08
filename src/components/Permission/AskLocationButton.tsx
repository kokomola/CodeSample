import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { Domains } from '@store/app/constants';
import { $isLocation, askPerm } from '@store/permissions';
import { Button } from '@components/uikit/Button';

export const AskLocationButton = () => {
  const [t] = useTranslation(Domains.Permission);

  const isLocation = useStore($isLocation);

  if (isLocation) return null;

  return (
    <Button
      type="ghost"
      text={t('allowLocation')}
      onPress={() => askPerm('location')}
    />
  );
};
