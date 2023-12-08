import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {ScreenTitle} from '@components/ScreenTitle';
import {IconButton} from '@components/uikit/IconButton';
import {InfoMenu} from '@components/InfoMenu';
import {SettingsMenu} from '@components/SettingsMenu';

import {logout} from '@store/logout';

import {styles as s} from './styles';
import {space500} from '@constants/colors';

import {Button} from '@components/uikit';
import {ReferralLinkModal} from '@components/ReferralLinkModal';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const [t] = useTranslation('SettingsMenu');

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: s.labelStyle,
        tabBarIndicatorStyle: s.indicatorStyle,
      }}
      sceneContainerStyle={s.screen}
      style={s.box}>
      <Tab.Screen name={t('settings')} component={SettingsMenu} />
      <Tab.Screen name={t('info')} component={InfoMenu} />
    </Tab.Navigator>
  );
};

export const ProfileMenu: React.FC = () => {
  const [t] = useTranslation('SettingsMenu');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={s.sav}>
      <View style={s.titleContainer}>
        <ScreenTitle title={t('screenTitle')} />
        <IconButton
          icon="logout"
          color={space500}
          styles={s.iconBox}
          onPress={logout}
        />
      </View>

      <View style={s.box}>
        <Button
          customStyle={s.parnterLink}
          text={t('partnerLink')}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <TopTabs />

      <ReferralLinkModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};
