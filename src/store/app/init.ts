import { Domain, Effect, forward, split } from 'effector';
import { Alert } from 'react-native';
import i18n from '@utils/i18n';
import {
  AppGate,
  AppDomain,
  alertFx,
  redirectToHome,
  ignoreFx,
  AppDomainErrorFx,
  domains,
  serverErrorFx,
  redirectToTokenSaleFx,
  redirectToShopNavFx,
} from '@store/app/index';

import { startUserPolling, stopUserPolling, fetchUserV2Fx } from '@store/user';
import { startWalletsPolling, stopWalletsPolling } from '@store/wallets';
import { fetchStables, fetchLegacyStables } from '@store/stables';
import { fetchSettingsFx } from '@store/settings';
import { fetchSollar } from '@store/sollars';
import { fetchServerConfig } from '@store/serverConfig';
import { ResultFail } from '@store/api/types';
import * as RootNavigation from '../../navigator/RootNavigation';
import { showErrorFx, showSuccess } from '@store/alert';
import { getErrorName } from '../../utils/getError';
import { log, logline } from '@utils/debug';
import { fetchPurchasedTokensFx } from '@store/tokenSaleWallet';
import { fetchTokenSaleOffersFx } from '@store/tokenSale';
import { fetchScreeningTokenFx } from '@store/kyc';
import { routes } from 'src/navigator/routes';
import { registerDevice } from '@store/registerDeviceForm';
import * as Navigate from '../../navigator/RootNavigation';
import { checkMobileDeviceToken } from '@store/loginPIN';
import { logout } from '@store/logout';
import { fetchLimitPerDayFx } from '@store/account/limit';
import { fetchBannersFx } from '@store/banner';
import { ERRORS, _ERRORS } from './constants';

AppDomain.onCreateEffect((effect: Effect<any, any, any>) => {
  split({
    source: effect.failData.filterMap((error: ResultFail) => {
      //log('[appDomain] fail', { error });
      const data = error?.response?.data;
      log('[AppDomain] error.response | data', data || error?.response);
      if (data) {
        return getErrorName(data) || 'default_error'; //logline(`[AppDomain] canShowError *** ${errorName} ***`);
      }
    }),
    match: {
      noDeviceTokenOrInvalidSign: (errorName) =>
        ERRORS.noDeviceToken.includes(errorName),
      invalidSign: (errorName) => ERRORS.invalidToken.includes(errorName),
      invalidAccessToken: (errorName) =>
        ERRORS.invalidAccessToken.includes(errorName),
      ignore: (errorName) => !!errorName && ERRORS.excepts.includes(errorName),
    },
    cases: {
      ignore: ignoreFx,
      invalidSign: checkMobileDeviceToken,
      noDeviceTokenOrInvalidSign: registerDevice,
      invalidAccessToken: logout,
      __: showSuccess.prepend((errorName: string) => {
        logline('[AppDomain.onCreateEffect __: showSuccess] error', errorName);
        const title = i18n.t(`AppDomainErrors:${errorName}`);
        const message = i18n.t(`AppDomainErrors:${errorName}_message`);
        return title === errorName
          ? { title: '', message: title }
          : { title, message };
      }),
    },
  });
});

alertFx.use(({ title, message, buttons, options }) => {
  Alert.alert(title, message, buttons, options);
});

AppDomainErrorFx.use((error: ResultFail) => {
  throw error;
});

serverErrorFx.use((domainName) => {
  const serverError: ResultFail = {
    response: { data: { error: domainName }, status: 0 },
  };
  throw serverError;
});

ignoreFx.use(() => {
  //log('', '');
});

forward({
  from: AppGate.open,
  to: [
    fetchUserV2Fx,
    startUserPolling,
    startWalletsPolling,
    fetchStables,
    fetchLegacyStables,
    fetchSettingsFx,
    fetchSollar,
    fetchServerConfig,
    fetchPurchasedTokensFx,
    fetchScreeningTokenFx,
    fetchTokenSaleOffersFx,
    fetchLimitPerDayFx,
    fetchBannersFx,
  ],
});

forward({
  from: AppGate.close,
  to: [stopUserPolling, stopWalletsPolling],
});

redirectToHome.use(() => {
  RootNavigation.resetRoot(routes.tabs.AmirWallet);
});

domains.forEach((domain: Domain) => {
  domain.onCreateEffect((effect: Effect<any, any, any>) => {
    effect.failData.watch((error: ResultFail) => {
      const response = error?.response;
      if (!response) return null;

      const shortDomain = domain.shortName;
      const { data } = error.response || { status: null, data: null };
      const errorName = data ? getErrorName(data) : null;

      console.log({ errorName });

      const fnError = _ERRORS.find(({ statusCode }) =>
        statusCode.includes(response?.status),
      );

      if (fnError) {
        fnError.fn(shortDomain, errorName);
      } else if (errorName) {
        const domainErrors = `${shortDomain}Errors`;
        console.log(`[domains.forEach]${domainErrors}:${errorName}_message)`);
        const message = i18n.t(`${domainErrors}:${errorName}_message`);
        const title = i18n.t(`${domainErrors}:${errorName}`);

        if (title === errorName) return AppDomainErrorFx(error);
        // Otherwise display the error
        return showErrorFx({ title, message });
      }
    });
  });
});

// redirects

redirectToTokenSaleFx.use(({ screen, params }) => {
  Navigate.navigate(routes.tabs.AmirInvest, {
    screen: routes.navigators.TokenSale,
    params: { screen, params },
  });
});

redirectToShopNavFx.use(({ screen, params }) => {
  Navigate.navigate(routes.tabs.AmirWallet, {
    screen: routes.navigators.Shop,
    params: { screen, params },
  });
});
