import * as React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { styles as s } from './styles';

import { $requests } from '@store/requests';

import { TxsBox } from '@components/TxHistoryLayout';
import { RequestHistoryRow } from '@components/RequestHistoryRow';

import { BackButton } from '@components/layout/BackButton';
import * as RootNavigation from '../../navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { IScreenProps } from 'src/common/types';
import { focusRequestsScreen } from '@store/app';

export const RequestHistory: React.FC<IScreenProps> = ({ navigation }) => {
  const [t] = useTranslation('RequestHistory');

  const requests = useStore($requests);

  React.useEffect(
    () => navigation.addListener('focus', () => focusRequestsScreen()),
    [navigation]
  );

  return (
    <SafeAreaView style={s.sav}>
      <View>
        <BackButton
          text={t('backButton')}
          onPress={() => RootNavigation.resetRoot(routes.tabs.AmirFinance)}
        />
      </View>

      <TxsBox>
        <FlatList
          data={requests}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RequestHistoryRow key={item.id} request={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </TxsBox>
    </SafeAreaView>
  );
};
