import { SyntheticEvent } from 'react';
import { attach, combine, Effect, Store } from 'effector';
import { $wallets } from '@store/wallets';
import { $serverConfig } from '@store/serverConfig';
import { $courses } from '@store/user';
import {
  Fee,
  GetFeeParams,
  TxFee,
  TxFeeBlockchain,
  TxFees,
  WithdrawRequestPayload,
} from '@store/withdraw/types';

import { NUMBER_REGEX } from '@utils/regexes';
import { bn } from '@utils/numbers/bn';
import { WithdrawDomain } from '@store/app';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { ResponseDone, ResultFail } from '@store/api/types';
import { AxiosResponse } from 'axios';
import Validator from '@utils/address-validator';
import BigNumber from 'bignumber.js';
import { createGate } from 'effector-react';
import { $awtTokenWalletType } from '@store/tokenSaleWallet';
import { $limitPerDayInSelectedAccount } from '@store/account/limit';
import { AxiosRequestParams } from '@store/api';
export const withdrawGate = createGate();

export const availableNetworks = {
  usdt: ['erc20', 'trc20', 'bep20'],
  busd: ['bep20'],
  usdc: ['bep20'],
};

export const calculateFee = (params: Omit<GetFeeParams, 'courses'>) => {
  const { fund, txFees, chosenFee, implementation, amount, config } = params;

  if (!txFees) {
    return null;
  }

  let fee = new BigNumber(
    (Number(txFees.fastest) * Number(txFees.quantity)).toString(),
  );
  const bnAmount = new BigNumber(amount);

  const gtEthThreshold =
    config &&
    fund.includes('eth') &&
    bnAmount.gte(config?.eth_fee_deactivation_threshold);
  const gtBtcThreshold =
    config &&
    fund.includes('btc') &&
    bnAmount.gte(config?.btc_fee_deactivation_threshold);

  const gtUsdtThreshold =
    config &&
    fund.includes('usdt') &&
    ((implementation === 'omnilayer' &&
      bnAmount.gte(config?.usdt_omni_fee_deactivation_threshold)) ||
      (implementation === 'usdt_erc20' &&
        bnAmount.gte(config?.usdt_erc20_fee_deactivation_threshold)) ||
      (['usdt_trc20', 'usdt_bep20'].includes(implementation) &&
        bnAmount.gte(config?.usdt_trc20_fee_deactivation_threshold)));

  if (gtEthThreshold || gtBtcThreshold || gtUsdtThreshold) {
    return fee.multipliedBy(0);
  }

  if (
    fund.includes('btc') ||
    (fund.includes('usdt') && implementation === 'omnilayer')
  ) {
    return fee.dividedBy(Math.pow(10, 8));
  }
  if (
    fund.includes('usdt') &&
    (implementation === 'usdt_trc20' || implementation.includes('bep20'))
  ) {
    return fee.dividedBy(100);
  }

  fee = chosenFee?.value
    ? new BigNumber(
        (Number(chosenFee?.value) * Number(txFees?.quantity)).toString(),
      )
    : fee;
  return fee.dividedBy(Math.pow(10, 9));
};
export const getFee = (params: GetFeeParams): BigNumber => {
  const { fund, implementation, courses } = params;

  const fee = calculateFee(params);

  if (!fee || !Number(fee)) {
    return new BigNumber(0);
  }

  if (
    fund.includes('usdt') &&
    implementation !== 'usdt_trc20' &&
    !implementation.includes('bep20')
  ) {
    if (implementation === 'omnilayer') {
      return fee.times(courses?.bitcoin_usdt);
    }
    return fee.times(courses?.eth?.usd);
  }
  return fee;
};
export const $amount = WithdrawDomain.createStore<string>('');
export const $address = WithdrawDomain.createStore<string>('');
export const $accountIndex = WithdrawDomain.createStore<number>(0);

export const withdrawRequestFx = WithdrawDomain.createEffect<
  WithdrawRequestPayload,
  AxiosResponse<{ code: 'ok'; actionId: number; nextStage: '2fa' | string }>,
  ResultFail<{ lastWithdrawAt: Date }>
>();

export const failWithdraw = WithdrawDomain.createEvent<string>();

export const $selectedAccount = combine(
  $wallets,
  $accountIndex,
  $awtTokenWalletType,
  (wallets, idx, awtToken) => {
    return [...wallets, awtToken].filter(Boolean)[idx];
  },
);

export const $token = WithdrawDomain.createStore<string>('usdt');
export const setToken = WithdrawDomain.createEvent<string>();

export const $network = WithdrawDomain.createStore<string>('erc20');
export const setNetwork = WithdrawDomain.createEvent<string>('');
export const $implementation = combine(
  $token,
  $network,
  (token, network) => `${token}_${network}`,
);
export const selectERC20 = WithdrawDomain.createEvent();
export const selectTRC20 = WithdrawDomain.createEvent();
export const selectBEP20 = WithdrawDomain.createEvent();
export const $isERC20Selected = $network.map((i) => i === 'erc20');
export const $isTRC20Selected = $network.map((i) => i === 'trc20');
export const $isBEP20Selected = $network.map((i) => i === 'bep20');

export const $amountInFocus = WithdrawDomain.createStore<boolean>(false);
export const $addressInFocus = WithdrawDomain.createStore<boolean>(false);

export const $amountTouched = WithdrawDomain.createStore<boolean>(false);
export const $addressTouched = WithdrawDomain.createStore<boolean>(false);

export const focusAmount = WithdrawDomain.createEvent<SyntheticEvent>();
export const focusAddress = WithdrawDomain.createEvent<SyntheticEvent>();

export const blurAmount = WithdrawDomain.createEvent<SyntheticEvent>();
export const blurAddress = WithdrawDomain.createEvent<SyntheticEvent>();

export const onChangeAmount = WithdrawDomain.createEvent<string>();
export const changeAmount = onChangeAmount.map(amountNormalizer);
export const changeAddress = WithdrawDomain.createEvent<string>();
export const changeAccountIndex = WithdrawDomain.createEvent<number>();

export const chooseForFullAmount = WithdrawDomain.createEvent<SyntheticEvent>();

export const throwErrorFx = WithdrawDomain.createEffect<ResultFail, void>();

export const $speed = WithdrawDomain.createStore<'fast' | 'fastest' | null>(
  null,
);
export const changeSpeed = WithdrawDomain.createEvent<
  'fast' | 'fastest' | null
>();

export const $fee = WithdrawDomain.createStore<Fee | null>(null);
export const changeFee = WithdrawDomain.createEvent<Fee>();

export const $txFees = WithdrawDomain.createStore<TxFees | null>(null);

export const $feeType = combine(
  $selectedAccount,
  $implementation,
  (account, implementation) => {
    if (account && !account?.fund.includes('usdt')) {
      return account?.fund.replace('_wallet', '');
    }
    if (implementation === 'usdt_trc20') {
      return 'trc20';
    }

    //// Important in selecting fees at Withdraw
    if (
      implementation === 'usdt_bep20' ||
      implementation === 'usdc_bep20' ||
      implementation === 'busd_bep20'
    ) {
      return 'bep20';
    }

    return implementation === 'omnilayer' ? 'btc' : 'erc20';
  },
);

export const $txFee = combine($feeType, $txFees, (feeType, txFees) => {
  return txFees ? txFees[feeType] || txFees.erc20 : null;
});
export const $calculatedFee: Store<BigNumber> = combine(
  $amount,
  $selectedAccount,
  $fee,
  $serverConfig,
  $implementation,
  $txFee,
  $courses,
  (amount, acc, fee, config, implementation, txFee, courses) => {
    const { fund } = acc;

    const speed = fee;

    return (
      (fee &&
        courses &&
        getFee({
          fund,
          txFees: txFee,
          chosenFee: speed,
          implementation,
          amount: Number(amount),
          config,
          courses,
        })) ||
      new BigNumber(0)
    );
  },
);

export const $isNotEnoughMoney = combine(
  $calculatedFee,
  $amount,
  $selectedAccount,
  (fee, amount, selectedAccount) =>
    fee ? fee.plus(amount).gt(selectedAccount?.balance.fund) : false,
);

export const $amountErrors = combine(
  {
    required: $amount.map((amount) =>
      amount.length === 0 ? 'withdrawStore:amountIsRequiredError' : null,
    ),
    limited: combine(
      $amount,
      $limitPerDayInSelectedAccount,
      (amount, limit) => {
        if (limit < 0) {
          // Unlimited
          return null;
        }
        if (limit === 0) {
          return 'withdrawStore:dailyLimitExceed';
        }
        if (+amount > limit) {
          return 'withdrawStore:dailyLimit';
        }
        return null;
      },
    ),
    invalid: $amount.map((amount) =>
      !NUMBER_REGEX.test(amount) ? 'withdrawStore:amountIsInvalidError' : null,
    ),
    notEnoughFunds: combine(
      $selectedAccount,
      $amount,
      $calculatedFee,
      (selectedAccount, amount, calculatedFee) =>
        bn(selectedAccount?.balance.sum || '0')
          .minus(new BigNumber(calculatedFee))
          .lt(amount)
          ? 'withdrawStore:notEnoughFundsError'
          : null,
    ),
  },
  ({ required, invalid, notEnoughFunds, limited }) =>
    [required, invalid, notEnoughFunds, limited].filter(Boolean),
);

export const $addressErrors = combine(
  {
    required: $address.map((address) =>
      address.length === 0 ? 'withdrawStore:addressIsRequired' : null,
    ),
    invalid: combine(
      $address,
      $selectedAccount,
      $isTRC20Selected,
      (address, account, isTRC20Selected) => {
        if (account?.fund === 'usdt_wallet') {
          return Validator.validate(address, 'usdt', {
            chainType: isTRC20Selected ? 'trc20' : 'erc20',
          })
            ? null
            : 'withdrawStore:addressIsInvalid';
        }

        return Validator.validate(address, account?.fund.split('_')[0])
          ? null
          : 'withdrawStore:addressIsInvalid';
      },
    ),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean),
);

export const $isFormValid = combine(
  [$amountErrors, $addressErrors],
  (errors) => !errors.flat().length,
);

export const pressSubmitWithdraw = WithdrawDomain.createEvent<SyntheticEvent>();

// CASE 1 FUND PAYS FEE. FASTEST SPEED, VALUE FROM SERVER
// CASE 2 USER PAYS MAX FEE. FASTEST SPEED, VALUE FROM SERVER
// CASE 3 USER SELECTS FEE. FAST OR FASTEST SPEED, VALUE FROM SERVER
export const WHO_PAYS_FEE = {
  USER: 'user',
  USER_MULTI: 'user_multi',
  FUND: 'fund',
};

export const $whoPaysFee = combine(
  $amount,
  $feeType,
  $serverConfig,
  (amount, feeType, conf) => {
    if (!conf || !amount) {
      return null;
    }

    if (
      (feeType === 'eth' &&
        bn(amount).lt(conf.eth_fee_deactivation_threshold)) ||
      (feeType === 'erc20' &&
        bn(amount).lt(conf.usdt_erc20_fee_deactivation_threshold))
    ) {
      return WHO_PAYS_FEE.USER_MULTI;
    }

    if (
      (feeType === 'btc' &&
        bn(amount).lt(conf.btc_fee_deactivation_threshold)) ||
      (feeType === 'trc20' &&
        bn(amount).lt(conf.usdt_trc20_fee_deactivation_threshold))
    ) {
      return WHO_PAYS_FEE.USER;
    }

    if (
      (feeType === 'btc' &&
        bn(amount).gte(conf.btc_fee_deactivation_threshold)) ||
      (feeType === 'eth' &&
        bn(amount).gte(conf.eth_fee_deactivation_threshold)) ||
      (feeType === 'erc20' &&
        bn(amount).gte(conf.usdt_erc20_fee_deactivation_threshold)) ||
      (feeType === 'trc20' &&
        bn(amount).gte(conf.usdt_trc20_fee_deactivation_threshold))
    ) {
      return WHO_PAYS_FEE.FUND;
    }
    return WHO_PAYS_FEE.USER;
  },
);

export const $isAbleToChooseFee = combine(
  $selectedAccount,
  $amount,
  $implementation,
  $serverConfig,
  (selectedAccount, amount, implementation, serverConfig) => {
    const { fund } = selectedAccount;
    return (
      ((fund.includes('eth') &&
        Number(amount) <
          Number(serverConfig?.eth_fee_deactivation_threshold)) ||
        (fund.includes('usdt') && implementation === 'usdt_erc20')) &&
      !fund.includes('usdt_trc20')
    );
  },
);

// шлем на сервер
export const $actualFee = combine($txFee, $speed, (fees, speed) =>
  fees && speed ? fees[speed] : null,
);

export const $form = combine(
  {
    amount: $amount,
    address: $address,
    selectedAccount: $selectedAccount,
    implementation: $implementation,
    speed: $speed,
    fee: $actualFee,
  },
  ({ amount, address, selectedAccount, implementation, speed, fee }) => {
    if (selectedAccount?.fund === 'usdt_wallet') {
      return {
        amount,
        address,
        fund: selectedAccount.fund,
        implementation,
        fee: {
          value: fee,
          speed,
        },
      };
    }

    return {
      amount,
      address,
      fund: selectedAccount?.fund,
      fee: {
        value: fee,
        speed,
      },
    };
  },
);

// polling

// fee
export const fetchTxFeeFx = WithdrawDomain.createEffect<
  TxFeeBlockchain,
  ResponseDone<TxFee>
>();

export const fetchTxFeeAllFx = WithdrawDomain.createEffect<
  void,
  ResponseDone<TxFees>
>();

export const pollFetchTxFeeAllFx: Effect<
  void,
  ResponseDone<TxFees>,
  Error
> = attach({
  effect: fetchTxFeeAllFx,
});

export const startFetchTxFeeAllPolling = pollFetchTxFeeAllFx.prepend(
  (payload: void) => payload,
);
export const stopFetchTxFeeAllPolling = WithdrawDomain.createEvent();

export const delayBetweenFetchTxFeeAllPollsFx: Effect<void, any, Error> =
  WithdrawDomain.createEffect();

/* Debug */

/* export const withdrawRequest = WithdrawDomain.createEvent<
  WithdrawRequestPayload
>(); */
/* export const withdrawRequestFx = WithdrawDomain.createEffect<
  WithdrawFxParams,
  WithdrawFxDone,
  WithdrawFxFail
>(); */
