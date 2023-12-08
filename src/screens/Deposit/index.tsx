import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useStore } from 'effector-react';
import QRCode from 'react-native-qrcode-svg';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import {
  RadioButtonsContainer,
  RadioButton,
} from '@components/uikit/RadioButtons';

import { blurDepositScreen, focusDepositScreen } from '@store/app';
import {
  $emptyNetworks,
  $networksByCoin,
  $selectedAddress,
  pressCopy,
} from '@store/deposit';
import {
  $selectedCoin,
  $selectedNetwork,
  $showCoins,
  selectCoin,
  selectNetwork,
} from '@store/coin-network';
import { styles as s } from './styles';
import { IScreenProps } from 'src/common/types';
import { fullNameByCoin } from '@store/coin-network/types';
import { Sign } from '@constants/funds';
import { showSuccessFx } from '@store/alert';

const RenderQR: React.FC = () => {
  const selectedAddress = useStore($selectedAddress);
  const address = selectedAddress?.address;

  if (!address) return null;

  return (
    <View style={s.qrBox}>
      <QRCode value={address} size={128} />
    </View>
  );
};

const RenderAddress: React.FC = () => {
  const [t] = useTranslation('Deposit');
  const selectedAddress = useStore($selectedAddress);
  const address = selectedAddress?.address;

  if (!address) return null;

  return (
    <View style={s.addressBox}>
      <Text style={s.addressLabel}>{t('address')}</Text>
      <Text style={s.addressValue}>{selectedAddress?.address}</Text>

      <Button
        text={t('copyButtonText')}
        onPress={() => pressCopy({ address })}
      />
    </View>
  );
};

const RenderTokenSelector: React.FC = () => {
  const [t] = useTranslation('Deposit');

  const selectedCoin = useStore($selectedCoin);
  const showCoins = useStore($showCoins);

  if (showCoins.length < 2) return null;

  return (
    <View style={s.tokenSelectorBox}>
      <Text style={s.selectorLabel}>{t('token')}</Text>
      <RadioButtonsContainer>
        {showCoins.map((coin, index) => (
          <RadioButton
            key={String(index)}
            onPress={() => selectCoin(coin)}
            text={Sign[coin]}
            icon={coin}
            active={selectedCoin === coin}
          />
        ))}
      </RadioButtonsContainer>
    </View>
  );
};

const RenderNetworkSelector: React.FC = () => {
  const [t] = useTranslation('Deposit');

  const networksByCoin = useStore($networksByCoin);
  const selectedNetwork = useStore($selectedNetwork);

  //if (networksByCoin.length < 2) return null;

  return (
    <View style={s.networkSelectorBox}>
      <Text style={s.selectorLabel}>{t('network')}</Text>
      <RadioButtonsContainer>
        {networksByCoin.map((network, index) => (
          <RadioButton
            key={String(index)}
            onPress={() => selectNetwork(network)}
            text={Sign[network]}
            active={selectedNetwork === network}
          />
        ))}
      </RadioButtonsContainer>
    </View>
  );
};

export const Deposit: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation('Deposit');

  React.useEffect(() => {
    navigation.addListener('focus', () => focusDepositScreen());
    navigation.addListener('blur', () => blurDepositScreen());
  }, [navigation]);

  const selectedCoin = useStore($selectedCoin);
  const emptyNetworks = useStore($emptyNetworks);

  if (!selectedCoin || emptyNetworks) {
    showSuccessFx({ title: 'Error', message: 'Select a coin and network' });
    return null;
  }

  return (
    <SafeAreaView style={s.sav}>
      <ScrollView>
        <BackButton
          text={`${t('screenTitle')} ${fullNameByCoin[selectedCoin]}`}
        />
        <RenderTokenSelector />
        <RenderNetworkSelector />
        <RenderQR />
        <RenderAddress />
        {/*<RenderTip />*/}
      </ScrollView>
    </SafeAreaView>
  );
};
