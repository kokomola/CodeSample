import React, {useCallback} from 'react';
import {View, Linking, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useStore} from 'effector-react';

import {ActionsPanel} from '@components/uikit/ActionsPanel';
import {$sunriseProgramData} from '@store/sunrise';

import {routes} from 'src/navigator/routes';
import {SunriseMoreInfoBlockProps} from './types';

export const SunriseMoreInfoBlock: React.FC<
  SunriseMoreInfoBlockProps
> = props => {
  const {containerStyle, navigation} = props;
  const [t] = useTranslation('SunriseMoreInfoBlock');

  const {programType} = useStore($sunriseProgramData);

  const supportedURL =
    'https://docs.google.com/forms/d/15QNC1OaQtCB2ro3OWTtnGn7gyIpQt5wJFnt-x8DE0tM/closedform';

  const handlePress = useCallback(
    async (url: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`${t('unsupportedURL')} ${url}`);
      }
    },
    [t],
  );

  return (
    <View style={containerStyle}>
      <ActionsPanel
        actions={[
          {
            onPress: () => {
              const {sunriseTab} = routes;
              console.log(programType);
              programType === 'sunrise'
                ? navigation.navigate(sunriseTab.landing)
                : navigation.navigate(sunriseTab.ambassadorLanding);
            },
            label: t('moreAboutProgram'),
          },
          {
            onPress: () => handlePress(supportedURL),
            label: t('careerProgram'),
          },
        ]}
      />
    </View>
  );
};
