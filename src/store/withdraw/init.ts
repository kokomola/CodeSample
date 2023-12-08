import {
  stopFetchTxFeeAllPolling,
  pollFetchTxFeeAllFx,
  startFetchTxFeeAllPolling,
} from './index';
import { combine, forward, sample, split, guard } from 'effector';

import {
  $accountIndex,
  $address,
  $addressInFocus,
  $addressTouched,
  $amount,
  $amountInFocus,
  $amountTouched,
  $calculatedFee,
  $fee,
  $feeType,
  $form,
  $implementation,
  $network,
  $selectedAccount,
  $speed,
  $token,
  $txFee,
  $txFees,
  $whoPaysFee,
  availableNetworks,
  blurAddress,
  blurAmount,
  changeAccountIndex,
  changeAddress,
  changeAmount,
  changeFee,
  changeSpeed,
  chooseForFullAmount,
  delayBetweenFetchTxFeeAllPollsFx,
  failWithdraw,
  fetchTxFeeAllFx,
  fetchTxFeeFx,
  focusAddress,
  focusAmount,
  pressSubmitWithdraw,
  selectBEP20,
  selectERC20,
  selectTRC20,
  setNetwork,
  setToken,
  WHO_PAYS_FEE,
  withdrawGate,
  withdrawRequestFx,
} from '@store/withdraw';
import { blurWithdrawScreen, focusWithdrawScreen } from '@store/app';
import { setActionId } from '@store/securityService';
import { AvailableVerifyActionTypes } from '@store/securityService/types';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { showError } from '@store/alert';
import { $serverConfig } from '@store/serverConfig';
import { differenceInDays, addMonths } from 'date-fns';
import i18n from '@utils/i18n';
import { fixNumber } from '@utils/numbers';
import BigNumber from 'bignumber.js';
import { $wallets } from '@store/wallets';
import { $awtTokenWalletType } from '@store/tokenSaleWallet';
import { changeVerifyRequestDomain } from '@store/verify';
import { log, logline } from '@utils/debug';
import { POLLING_INTERVAL_FEE } from './constants';

/** Form */

$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurWithdrawScreen)
  .reset(changeAccountIndex)
  .reset(setNetwork)
  .reset(selectERC20)
  .reset(selectTRC20)
  .reset(selectBEP20);
$address
  .on(changeAddress, (_, address) => address)
  .reset(blurWithdrawScreen)
  .reset(changeAccountIndex)
  .reset(setNetwork)
  .reset(selectERC20)
  .reset(selectTRC20)
  .reset(selectBEP20);
$fee.on(changeFee, (_, fee) => fee);
$network.on(setNetwork, (_, network) => network);
$token.on(setToken, (_, token) => token);

const $fundImplemention = combine(
  $selectedAccount,
  $implementation,
  $txFee,
  (selectedAccount, implementation, txFee) => ({
    fund: selectedAccount?.fund,
    implementation,
    txFee,
  })
);

sample({
  clock: guard({
    clock: $token,
    source: $network,
    filter: (network, token) =>
      !availableNetworks[token as keyof typeof availableNetworks].includes(
        network
      ),
  }),
  source: $token,
  fn: (token) => availableNetworks[token as keyof typeof availableNetworks][0],
  target: setNetwork,
});

sample({
  source: $fundImplemention,
  fn: ({ fund, implementation, txFee }) => {
    if (fund === 'awt_wallet') {
      return {
        speed: 'fastest',
        value: '0',
      };
    }
    if (
      fund?.includes('eth') ||
      (fund?.includes('usdt') && implementation !== 'usdt_trc20')
    ) {
      return { speed: 'fast', value: txFee ? txFee.fast : '' };
    }
    if (
      fund?.includes('btc') ||
      (fund?.includes('usdt') && implementation === 'usdt_trc20')
    ) {
      return { speed: 'fastest', value: txFee ? txFee.fastest : '' };
    } else {
      return { speed: 'fast', value: txFee ? txFee.fast : '' };
    }
  },
  target: changeFee,
});

sample({
  source: combine($wallets, $awtTokenWalletType, (wallets, awtToken) => [
    ...wallets,
    awtToken,
  ]),
  clock: focusWithdrawScreen,
  fn: (wallets, { fund }) =>
    wallets.findIndex((wal) => wal?.fund === fund) > -1
      ? wallets.findIndex((wal) => wal?.fund === fund)
      : wallets.findIndex((wal) => wal?.fund === 'awt_wallet'),
  target: changeAccountIndex,
});

$accountIndex
  .on(changeAccountIndex, (_, index) => index)
  .reset(blurWithdrawScreen);

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurWithdrawScreen);
$addressInFocus
  .on(focusAddress, () => true)
  .reset(blurAddress, blurWithdrawScreen);

$amountTouched.on(blurAmount, () => true).reset(blurWithdrawScreen);
$addressTouched.on(blurAddress, () => true).reset(blurWithdrawScreen);

$network
  .on(selectERC20, () => 'erc20')
  .on(selectTRC20, () => 'trc20')
  .on(selectBEP20, () => 'bep20')
  .reset(blurWithdrawScreen);

// add entire amount to input
sample({
  clock: chooseForFullAmount,
  source: combine($selectedAccount, $calculatedFee, (acc, fee) => ({
    ...acc,
    fee,
  })),
  fn: (selAcc) => {
    const { balance, fund, fee } = selAcc;
    const result = fixNumber(
      new BigNumber(balance.sum).minus(new BigNumber(fee)),
      fund
    );
    if (Number(result) > 0) return result;
    else return 0;
  },
  target: $amount,
});

/** Withdraw Request */

sample({
  source: $form,
  clock: pressSubmitWithdraw,
  target: withdrawRequestFx,
});

withdrawRequestFx.use((form) => {
  const method = 'post';
  const url = endpoints.securityService.verify;
  const body = { data: form, type: AvailableVerifyActionTypes.withdraw };

  return signedRequest({ method, url, body });
});

forward({
  from: withdrawRequestFx.doneData,
  to: setActionId.prepend((response) => response.data.actionId),
});

split({
  source: withdrawRequestFx.failData.map((e) => e.response?.data.error),
  match: {
    cannotUseWithdrawYet: ({ message: msg }) =>
      msg && msg === 'cannot_use_withdraw_yet',
    ethTooBigAmount: ({ message: msg }) => msg && msg === 'eth_too_big_amount',
    btcTooBigAmount: ({ message: msg }) => msg && msg === 'btc_too_big_amount',
    usdtTooBigAmount: ({ message: msg }) =>
      msg && msg === 'usdt_too_big_amount',
  },
  cases: {
    ethTooBigAmount: failWithdraw.prepend(() => 'eth'),
    btcTooBigAmount: failWithdraw.prepend(() => 'btc'),
    usdtTooBigAmount: failWithdraw.prepend(() => 'usdt'),
    cannotUseWithdrawYet: showError.prepend(({ data }) => {
      const days = differenceInDays(
        addMonths(data.lastWithdrawAt, 1),
        Date.now()
      );
      return {
        title: i18n.t('WithdrawDomainErrors:title'),
        message: `${i18n.t(
          'WithdrawDomainErrors:withdraw_throttling_error'
        )} ${days} ${i18n.t(
          'WithdrawDomainErrors:withdraw_throttling_error_days'
        )}`,
      };
    }),
    //__: errorFx.prepend((error) => ({ response: { data: { error } } })),
  },
});

sample({
  clock: failWithdraw,
  source: $serverConfig,
  fn: (config, coin) => {
    return {
      limit: config[`${coin}_withdraw_limit`],
      coin,
    };
  },
  target: showError.prepend(({ limit, coin }) => {
    return {
      title: i18n.t('WithdrawDomainErrors:title'),
      message: `${i18n.t(
        'WithdrawDomainErrors:withdraw_too_big_amount'
      )} ${limit} ${coin.toUpperCase()}`,
    };
  }),
});

/** Fee */

$txFees.on(fetchTxFeeAllFx.doneData, (_, response) => response?.data.data);
$speed.on(changeSpeed, (_, fee) => fee);

sample({
  source: $whoPaysFee,
  fn: (whoPaysFee) => {
    if (whoPaysFee !== WHO_PAYS_FEE.USER_MULTI) return 'fastest';
    return 'fast';
  },
  target: changeSpeed,
});

forward({
  from: focusWithdrawScreen,
  to: changeVerifyRequestDomain.prepend(() => 'Withdraw'),
});

// polling

/* guard({
  clock: [$feeType.updates, $implementation.updates, $selectedAccount.updates],
  source: $feeType,
  filter: (feeType) =>
    !!feeType && ['btc', 'eth', 'erc20', 'trc20'].includes(feeType),
  target: fetchTxFeeFx,
}); */

forward({
  from: withdrawGate.open,
  to: startFetchTxFeeAllPolling,
  //to: fetchTxFeeAllFx,
});

forward({
  from: withdrawGate.close,
  to: stopFetchTxFeeAllPolling,
  //to: fetchTxFeeAllFx,
});

fetchTxFeeFx.use(async (coin) => {
  const method = 'get';
  const url = endpoints.withdraw.fees(coin);

  return signedRequest({ method, url });
});

fetchTxFeeAllFx.use(async () => {
  const method = 'get';
  const url = endpoints.withdraw.feesAll();

  return signedRequest({ method, url });
});

delayBetweenFetchTxFeeAllPollsFx.use(
  () =>
    new Promise((resolve, reject) => {
      const timeoutID = setTimeout(resolve, POLLING_INTERVAL_FEE);

      const unwatch = stopFetchTxFeeAllPolling.watch(() => {
        unwatch();
        clearTimeout(timeoutID);
        reject(new Error('Error in dalay detween fees polls'));
      });
    })
);

forward({
  from: pollFetchTxFeeAllFx,
  to: delayBetweenFetchTxFeeAllPollsFx,
});

forward({
  from: delayBetweenFetchTxFeeAllPollsFx.done,
  to: pollFetchTxFeeAllFx,
});

/* Debug */

/* $txFee.watch((txFee) => log('[$store/withdraw]', { txFee }));
$feeType.watch((feeType) => logline('[$store/withdraw]', { feeType })); */
