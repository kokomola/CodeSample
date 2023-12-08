import React, { useState } from 'react';
import { Icon } from '@components/uikit/Icon';
import { feedbackColor } from '@constants/colors';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';
import { navigate } from 'src/navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import { $tfaDisabled } from '@store/twoFaSetup';
import { useStore } from 'effector-react';
import { $isPassedKyc } from '@store/user';
export const TwoFaWarning: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);

  const { t } = useTranslation('TwoFAWarning');

  const is2faDisabled = useStore($tfaDisabled);
  const isPassedKyc = useStore($isPassedKyc);

  if (isPassedKyc) {
    return null;
  }

  // if (!is2faDisabled && isPassedKyc) {
  //   return null;
  // }

  return (
    <Popover
      onRequestClose={() => setShowPopover(false)}
      isVisible={showPopover}
      from={
        <TouchableOpacity
          style={s.warningButton}
          onPress={() => setShowPopover(true)}
        >
          <Icon icon="warning" color={feedbackColor} />
        </TouchableOpacity>
      }
    >
      {is2faDisabled ? (
        <TouchableOpacity
          style={s.popoverView}
          onPress={() => {
            setShowPopover(false);
            navigate(routes.tabs.Settings, {
              screen: routes.profileTab.twoFactorAuthSettings,
            });
          }}
        >
          <Text style={s.title}>{t('twofa_title')}</Text>
          <Text>{t('twofa_text')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={s.popoverView}
          onPress={() => {
            setShowPopover(false);
            navigate(routes.tabs.Settings, {
              screen: routes.profileTab.kycScreen,
            });
          }}
        >
          <Text style={s.title}>{t('kyc_title')}</Text>
          <Text>{t('kyc_text1')}</Text>
          <Text>{t('kyc_text2')}</Text>
          <Text>{t('kyc_text3')}</Text>
          <Text>{t('kyc_text4')}</Text>
        </TouchableOpacity>
      )}
    </Popover>
  );
};
