import { combine } from 'effector';
import { Sollar } from './types';
import { $settings } from '@store/settings';
import { Settings } from '@store/settings/types';

import { AppDomain } from '@store/app';
import { $usdtBalance } from '@store/wallets';
import { ResponseDone } from '@store/api/types';
import { logline } from '@utils/debug';

export const $sollar = AppDomain.createStore<Sollar>({
  amountRealSolars: 0,
  potentialSolars: 0,
  solarHistory: [],
  solarIncomes: [],
});
export const changeSollar = AppDomain.createEvent<Sollar>();
export const fetchSollar = AppDomain.createEvent<void>();
export const fetchSollarRequestFx = AppDomain.createEffect<
  { limit?: number; offset?: number },
  ResponseDone<Sollar>
>();

export const $isSollarBalanceLoaded = AppDomain.createStore(false);

export const $sollarBalance = $sollar.map((sollar) => sollar.amountRealSolars);

export const $sollarTxs = $sollar.map((sollar) =>
  sollar.solarIncomes.map((s) =>
    s.type === 'buy' ? { ...s, type: 'sollar_buy' } : s
  )
);

// Form

export const $price = AppDomain.createStore<string>('');

export const $amount = AppDomain.createStore<string>('1');
export const $amountInFocus = AppDomain.createStore<boolean>(false);
export const $amountTouched = AppDomain.createStore<boolean>(false);

export const $forFullSumErrors = combine({});

export const $amountErrors = combine(
  {
    required: $amount.map((amount: string) =>
      amount.length === 0 || +amount === 0
        ? 'SollarWallet:amountIsRequiredError'
        : null
    ),
    invalid: combine($price, $usdtBalance, (price, usdtBalance = '0') => {
      return +price > +usdtBalance // || +price === 0
        ? 'SollarWallet:notEnoughFundsError'
        : null;
    }),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

export const $isFormValid = combine(
  $amountErrors,
  (errors) => !errors.flat().length
);

export const $sollarCourse = $settings.map(
  ({ sollarCourse }: Settings) => sollarCourse
);

export const focusAmount = AppDomain.createEvent<React.SyntheticEvent>();
export const focusPrice = AppDomain.createEvent<React.SyntheticEvent>();

export const blurAmount = AppDomain.createEvent<React.SyntheticEvent>();
export const blurPrice = AppDomain.createEvent<React.SyntheticEvent>();

export const onChangeAmount = AppDomain.createEvent<string>();
export const changeAmount = onChangeAmount.map((amount: string) =>
  //amount.replace(/[^0-9.]+/g, '')
  amount.replace(/[^0-9]+/g, '')
);
export const changePrice = AppDomain.createEvent<string>();

export const calcAmountFx = AppDomain.createEffect<
  {
    usdtBalance: string;
    sollarCourse: string;
  },
  string
>();
export const calcCostFx = AppDomain.createEffect<
  {
    amount: string;
    sollarCourse: string;
  },
  string
>();

export const buySollar = AppDomain.createEvent<void>();

export const chooseForFullSum = AppDomain.createEvent<React.SyntheticEvent>();

export const redirectToSollarWalletScreenFx = AppDomain.createEffect();

export const buySollarRequest = AppDomain.createEvent<{ amount: string }>();
export const buySollarRequestFx = AppDomain.createEffect<
  { amount: string },
  ResponseDone<{ code: 'ok' }>
>();

// debug

//$sollarCourse.watch((sollarCourse) => logline('$store/sollars', { sollarCourse }))