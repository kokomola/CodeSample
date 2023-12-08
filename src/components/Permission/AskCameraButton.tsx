import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { Domains } from '@store/app/constants';
import { $isCamera, askPerm } from '@store/permissions';
import { Button } from '@components/uikit/Button';

export const AskCameraButton = () => {
  const [t] = useTranslation(Domains.Permission);

  const isCamera = useStore($isCamera);

  if (isCamera) return null;

  return (
    <Button
      type="ghost"
      text={t('allowCamera')}
      onPress={() => askPerm('camera')}
    />
  );
};
