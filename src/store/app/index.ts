import { createGate } from 'effector-react';
import { createDomain, createEvent, Domain } from 'effector';
import { AlertButton, AlertOptions } from 'react-native';
import { ResultFail } from '@store/api/types';
import { Fund, WalletFund } from '@store/wallets/types';
import { Domains } from './constants';

export const AppDomain = createDomain();
export const AccountDomain = createDomain(Domains.Account);
export const KycDomain = createDomain(Domains.Kyc);
export const PermissionDomain = createDomain(Domains.Permission);
export const redirectDomain = createDomain(Domains.Redirect);
export const ReferralLinkDomain = createDomain(Domains.ReferralLink);
export const securityServiceDomain = createDomain(Domains.SecurityService);
export const ServerDomain = createDomain(Domains.Server);
export const ShopDomain = createDomain(Domains.Shop);
export const StableDomain = createDomain(Domains.Stable);
export const SunriseDomain = createDomain(Domains.Sunrise);
export const TokenSale = createDomain(Domains.TokenSale);
export const TransferDomain = createDomain(Domains.Transfer);
export const twoFaDomain = createDomain(Domains.TwoFa);
export const WithdrawDomain = createDomain(Domains.Withdraw);
export const DepositDomain = createDomain(Domains.Deposit);

export const domains: Domain[] = [
  ServerDomain,
  twoFaDomain,
  ShopDomain,
  TransferDomain,
  WithdrawDomain,
  securityServiceDomain,
  StableDomain,
  SunriseDomain,
  TokenSale,
  KycDomain,
  redirectDomain,
  AccountDomain,
  PermissionDomain,
  ReferralLinkDomain,
];

export const AppGate = createGate();

export const alertFx = AppDomain.createEffect<
  {
    title: string;
    message?: string;
    buttons?: AlertButton[];
    options?: AlertOptions;
  },
  void
>();

export const AppDomainErrorFx = AppDomain.createEffect<
  ResultFail,
  void,
  ResultFail
>();
export const serverErrorFx = ServerDomain.createEffect<
  string,
  void,
  ResultFail
>();
export const ignoreFx = AppDomain.createEffect<void, void>();

// we cannot use gates with RN navigator.
// so, we should use events and bind it to navigator events

// TODO: we must move all focus and blur events to this file

// example:

// React.useEffect(
//   () => navigation.addListener('focus', () => focusSetupPinScreen()),
//   [navigation]
// );
//
// React.useEffect(
//   () => navigation.addListener('blur', () => blurSetupPinScreen()),
//   [navigation]
// );

export const focusKycScreen = AppDomain.createEvent();
export const blurKycScreen = AppDomain.createEvent();

export const focusChangePasswordScreen = AppDomain.createEvent();
export const blurChangePasswordScreen = AppDomain.createEvent();

export const focusTwoFaSettingsScreen = AppDomain.createEvent();
export const blurTwoFaSettingsScreen = AppDomain.createEvent();

export const focusChangeEmailScreen = AppDomain.createEvent();
export const blurChangeEmailScreen = AppDomain.createEvent();

export const focusWithdrawScreen = AppDomain.createEvent<{ fund: Fund }>();
export const blurWithdrawScreen = AppDomain.createEvent();

// AmirFinance

export const focusAmirFinanceScreen = AppDomain.createEvent();

export const focustSavingScreen = AppDomain.createEvent();

// Sollar

export const focusSollarWalletBuyScreen = AppDomain.createEvent();
export const blurSollarWalletBuyScreen = AppDomain.createEvent();

export const blurSollarWalletScreen = AppDomain.createEvent();
export const focusSollarWalletScreen = AppDomain.createEvent();

export const redirectToHome = AppDomain.createEffect();

// Stable

export const focusStableScreen = AppDomain.createEvent();
export const blurStableScreen = AppDomain.createEvent();

export const focusStableCreateScreen = AppDomain.createEvent();
export const blurStableCreateScreen = AppDomain.createEvent();
export const focusDepositScreen = createEvent();
export const blurDepositScreen = createEvent();

// Transfer

export const focusTransferConversionScreen = createEvent();
export const blurTransferConversionScreen = createEvent();

export const focusTransferFromSavingScreen = TransferDomain.createEvent();
export const blurTransferFromSavingScreen = TransferDomain.createEvent();

export const focusTransferToSavingScreen = AppDomain.createEvent();
export const blurTransferToSavingScreen = AppDomain.createEvent();

export const focusTransferByEmailScreen = TransferDomain.createEvent();
export const blurTransferByEmailScreen = TransferDomain.createEvent();

export const focusTransferByPhoneScreen = TransferDomain.createEvent();
export const blurTransferByPhoneScreen = TransferDomain.createEvent();

export const focusCryptoWalletScreen = AppDomain.createEvent();

// Shop

export const redirectToShopNavFx = AppDomain.createEffect<
  { screen: string; params?: any },
  void
>();

export const focusShopCheckoutScreen = ShopDomain.createEvent();
export const blurShopCheckoutScreen = ShopDomain.createEvent();

export const focusShopBasketScreen = ShopDomain.createEvent();

export const focusShopProductScreen = ShopDomain.createEvent();
export const blurShopProductScreen = ShopDomain.createEvent();

export const focusShopListScreen = ShopDomain.createEvent();

// Sunrise

export const focusSunriseProgramScreen = AppDomain.createEvent();
export const blurSunriseProgramScreen = AppDomain.createEvent();

export const focusSunriseLandingScreen = AppDomain.createEvent();
export const blurSunriseLandingScreen = AppDomain.createEvent();

export const focusAmbassadorLandingScreen = AppDomain.createEvent();
export const blurAmbassadorLandingScreen = AppDomain.createEvent();

export const focusSunriseDiscountHistoryScreen =
  SunriseDomain.createEvent<unknown>();

export const focusSunriseLineScreen = SunriseDomain.createEvent<unknown>();
export const blurSunriseLineScreen = SunriseDomain.createEvent<unknown>();

// Token Sale
export const redirectToTokenSaleFx = AppDomain.createEffect<
  { screen: string; params?: any },
  void
>();

export const focusTokenSaleBuyScreen = AppDomain.createEvent();
export const blurTokenSaleBuyScreen = AppDomain.createEvent();

export const focusTokenSaleWalletScreen = AppDomain.createEvent();
export const blurTokenSaleWalletScreen = AppDomain.createEvent();

// GlobalPass

export const focusGlobalPassBioScreen = AppDomain.createEvent();
export const blurGlobalPassBioScreen = AppDomain.createEvent();
export const focusGlobalPassKycScreen = AppDomain.createEvent();
export const blurGlobalPassKycScreen = AppDomain.createEvent();

// RegisterDevice

export const focusRegisterDeviceScreen = AppDomain.createEvent();
export const blurRegisterDeviceScreen = AppDomain.createEvent();

export const focusRequestsScreen = AppDomain.createEvent();
