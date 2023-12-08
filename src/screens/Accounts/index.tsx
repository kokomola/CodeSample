import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $isPassedKyc } from '@store/user';

import {
  $isOwnedTokensLoaded,
  $purchasedTokens,
  selectTokenId,
} from '@store/tokenSaleWallet';

import { TouchableRow } from '@components/TouchableRow';
import { ScreenTitle } from '@components/ScreenTitle';
import { Courses } from '@components/Courses';
import { SecurityAlert } from '@components/SecurityAlert';

import * as colors from '@constants/colors';
import { fixToSol } from '@utils/numbers/fix';

import { $isSollarBalanceLoaded, $sollarBalance } from '@store/sollars';
import { redirectToTokenSaleFx } from '@store/app';
import { selectFund } from '@store/account/fund';
import { routes } from 'src/navigator/routes';

import { TransfersRow } from '@components/TransfersRow';
import { SollarGiftsRow } from '@components/SollarGiftsRow';
import { Header } from '@components/Header';
import { SgcIcon } from '@components/uikit/Icon/lib';
import { styles as s } from './styles';
import { $limitPerDay } from '@store/account/limit';
import { useNavigation } from '@react-navigation/native';
import { is } from '@utils/common/condition';
import { WalletRow } from '@components/WalletRow';
import { Fund } from '@constants/funds';
import { selectCoin } from '@store/coin-network';
import { Coin, getCoin } from '@store/coin-network/types';
import { BannerRow } from '@components/BannerRow';
import { IScreenProps } from 'src/common/types';
import { log, logline } from '@utils/debug';
import { Button } from '@components/uikit';
import { IsDev } from '@utils/getEnv';
import { buildIBDev, buildIBProd } from 'src/utils/globalpass';
import { IS_PRODUCTION } from 'src/config';

const SGCToken = () => {
  const navigation = useNavigation();

  const isSollarBalanceLoaded = useStore($isSollarBalanceLoaded);
  const sollarBalance = useStore($sollarBalance);

  return (
    <TouchableRow
      loading={!isSollarBalanceLoaded}
      onPress={() => navigation.navigate(routes.navigators.Sollar)}
      primaryText={`${fixToSol(String(sollarBalance))} SGC`}
      smallText="Sollar Gift Coin"
      SvgIcon={SgcIcon}
      iconColor={colors.iconColors.sol}
    />
  );
};

const OtherTokens: Function = () => {
  const purchasedTokens = useStore($purchasedTokens);
  const isOwnedTokensLoaded = useStore($isOwnedTokensLoaded);

  if (is.empty(purchasedTokens)) return null;

  return purchasedTokens?.map(({ token, balance }) => (
    <TouchableRow
      key={token.id}
      loading={!isOwnedTokensLoaded}
      onPress={() => {
        const coin = getCoin(token.code.trim()) || null;
        selectCoin(coin);
        selectTokenId(token.id);
        redirectToTokenSaleFx({ screen: routes.tokenSaleNav.TokenSaleWallet });
      }}
      primaryText={`${balance} ${token.code}`}
      smallText={token.title}
      imageURI={token.image}
      iconColor={colors.fieryRose}
    />
  ));
};

export const Accounts: React.FC<IScreenProps> = ({ navigation }) => {
  const [t] = useTranslation('Accounts');

  const limit = useStore($limitPerDay);
  const isPassedKyc = useStore($isPassedKyc);

  const buttons = !isPassedKyc && <Text>{t('limit', { limit })}</Text>;

  const route = routes.amirWallet.CryptoWallet;

  return (
    <SafeAreaView style={s.sav}>
      <Header />
      <ScrollView style={s.sv}>
        <View style={s.securityAlertBox}>
          <SecurityAlert />
        </View>
        {/*         <Button
          text="Check Bio globalPass"
          onPress={async () => {
            try {
              const token = await buildIBDev(
                '10cb3203-8944-47bc-91ac-cb6db0d38c07',
              );
              console.log('that is all', token);
            } catch (error) {
              console.log('[check Account]', { error });
            }
          }}
        /> */}
        <ScreenTitle
          title={t('walletsSectionTitle')}
          showTwoFAWarning
          buttons={buttons}
        />
        <View style={s.section}>
          <WalletRow
            fund={Fund.BtcWallet}
            route={route}
            coin={Coin.BTC}
            percent
          />
          <WalletRow
            fund={Fund.EthWallet}
            route={route}
            coin={Coin.ETH}
            percent
          />
          <WalletRow
            fund={Fund.UsdtWallet}
            route={route}
            coin={Coin.USDT}
            percent
          />
          <SGCToken />
          <OtherTokens />
        </View>

        <TransfersRow />

        <SollarGiftsRow />

        <View style={s.section}>
          <BannerRow navigation={navigation} />
        </View>

        <View style={s.coursesBox}>
          <Courses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
