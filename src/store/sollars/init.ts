import { routes } from 'src/navigator/routes';
import { forward, guard, sample } from 'effector';
import { $settings } from '@store/settings';
import i18n from '@utils/i18n';
import {
  $amount,
  $amountInFocus,
  $amountTouched,
  $price,
  $sollar,
  $sollarCourse,
  blurAmount,
  buySollar,
  buySollarRequest,
  buySollarRequestFx,
  calcAmountFx,
  calcCostFx,
  changeAmount,
  changeSollar,
  fetchSollar,
  fetchSollarRequestFx,
  focusAmount,
  chooseForFullSum,
  redirectToSollarWalletScreenFx,
  $isSollarBalanceLoaded,
  $sollarBalance,
} from './index';
import { blurSollarWalletBuyScreen } from '@store/app';
import { Settings } from '@store/settings/types';
import { showErrorFx } from '@store/alert';
import { $usdtBalance, fetchWalletsFx } from '@store/wallets';
import * as RootNavigation from '../../navigator/RootNavigation';
import { fixToSol, fixToUsdt } from '@utils/numbers/fix';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { bn } from '@utils/numbers/bn';
import { CanBuyAmound } from './types';
import {
  $verifyEndpoint,
  changeVerifyEndpoint,
  changeVerifyRequestDomain,
  openVerifyBottomSheet,
  verifyRequestFx,
} from '@store/verify';
import { logline } from '@utils/debug';

$sollar.on(changeSollar, (_, sollar) => sollar);

forward({
  from: fetchSollar,
  to: fetchSollarRequestFx,
});

fetchSollarRequestFx.use(async (params = {}) => {
  const method = 'get';
  const url = endpoints.sollar.fetchOffsetSollars(params);

  return signedRequest({ method, url });
});

$isSollarBalanceLoaded.on(fetchSollarRequestFx.done, () => true);

forward({
  from: fetchSollarRequestFx.doneData.map((response) => response.data.data),
  to: changeSollar,
});

$amount.on(changeAmount, (_, amount) => amount);
//.reset(blurSollarWalletBuyScreen);
$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurSollarWalletBuyScreen);
$amountTouched.on(blurAmount, () => true).reset(blurSollarWalletBuyScreen);

// Calculates

calcAmountFx.use(async ({ usdtBalance, sollarCourse }) => {
  const price = bn(usdtBalance).dividedBy(sollarCourse);
  return price.isNaN() ? '' : fixToSol(price);
});

// Покупка на всю сумму

sample({
  clock: chooseForFullSum,
  source: {
    usdtBalance: $usdtBalance,
    sollarCourse: $sollarCourse,
  },
  target: calcAmountFx,
});

forward({
  from: calcAmountFx.doneData,
  to: changeAmount,
});

// Вычисляем сумму покупки usdt при изменении количества SOL
// Пусть вычисляется цены, даже если $cannotBuyAmound

calcCostFx.use(async ({ amount, sollarCourse }) => {
  const price = bn(amount).multipliedBy(sollarCourse);
  return price.isNaN() ? '' : fixToUsdt(price);
});

sample({
  clock: changeAmount,
  source: $settings,
  fn: ({ sollarCourse }: Settings, amount: string) => ({
    amount,
    sollarCourse,
  }),
  target: calcCostFx,
});

sample({
  clock: $settings.updates,
  source: $amount,
  fn: (amount: string, { sollarCourse }: Settings) => ({
    amount,
    sollarCourse,
  }),
  target: calcCostFx,
});

forward({
  from: calcCostFx.doneData,
  to: $price,
});

// Покупаем Sollar

export const buyAmount = sample({
  clock: buySollar,
  source: {
    sollarCourse: $sollarCourse,
    amount: $amount,
    usdtBalance: $usdtBalance,
  },
  fn: ({ sollarCourse, amount, usdtBalance }: CanBuyAmound) => {
    const can =
      +sollarCourse * +amount <= +usdtBalance &&
      +amount > 0 &&
      +sollarCourse > 0 &&
      +usdtBalance > 0;
    return { amount, can };
  },
});

// Можем купить

forward({
  from: buyAmount.filterMap(
    ({ amount, can }: { amount: string; can: boolean }) => {
      if (can) {
        return { amount };
      }
    },
  ),
  to: buySollarRequest,
});

forward({
  from: buyAmount.filterMap(({ can }: { amount: string; can: boolean }) => {
    if (!can) {
      return {
        title: '',
        message: i18n.t('SollarWallet:notEnoughFundsError'),
        button: { text: 'OK' },
      };
    }
  }),
  to: showErrorFx,
});

forward({
  from: buySollarRequest,
  to: buySollarRequestFx,
});

buySollarRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.sollar.buy;

  return signedRequest({ method, url, body });
});

// Переходим на SollarWalletScreen после успешной покупки

forward({
  from: buySollarRequestFx.done,
  to: [
    openVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.sollar.verify),
    changeVerifyRequestDomain.prepend(() => routes.sollarNav.SollarWallet),
  ],
});

guard({
  source: $verifyEndpoint,
  clock: verifyRequestFx.finally,
  filter: (endpoint) => endpoint === endpoints.sollar.verify,
  target: [fetchSollar, fetchWalletsFx, redirectToSollarWalletScreenFx],
});
redirectToSollarWalletScreenFx.use(async () =>
  RootNavigation.goBackOrToScreen(routes.sollarNav.SollarWallet),
);

//$sollar.watch((sollars) => logline("[sollars]", sollars.amountRealSolars));
$sollarBalance.watch((sgc) => logline('', { sgc }));
