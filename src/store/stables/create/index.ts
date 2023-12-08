import { combine, sample, Store } from 'effector';
import BigNumber from 'bignumber.js';

import { Currency, Sign } from '@constants/funds';
import { ResponseDone, ResultFail } from '@store/api/types';
import { StableDomain } from '@store/app';
import { $wallets } from '@store/wallets';
import { bn } from '@utils/numbers/bn';
import { NUMBER_REGEX } from '@utils/regexes';
import {
	calcFinalAmountWithCap,
	calcMonthIncome,
	calcNetIncome,
	calcNetIncomeWithCap,
} from '@utils/stableCalc';
import { Capitalization, YearInMonths } from '../rates/types';
import { CalculationData, StableCreateDto } from '../types';
import { $rates } from '../rates';
import { $user } from '@store/user';
import { fixNumber } from '@utils/numbers';
import i18n from '@utils/i18n';
import { log } from '@utils/debug';

// Interface
export const $name = StableDomain.createStore('');
export const $nameInFocus = StableDomain.createStore(false);
export const $nameTouched = StableDomain.createStore(false);
export const changeName = StableDomain.createEvent<string>();

export const focusName = StableDomain.createEvent<React.SyntheticEvent>();
export const blurName = StableDomain.createEvent<React.SyntheticEvent>();

// currency
export const $currency = StableDomain.createStore(Currency.USDT);
export const changeCurrency = StableDomain.createEvent<Currency>();
//

//export const $amount = StableDomain.createStore(bn(0));

// amount
export const $strAmount = StableDomain.createStore('');
export const $amount = StableDomain.createStore(bn(0));
export const $amountInFocus = StableDomain.createStore(false);
export const $amountTouched = StableDomain.createStore(false);
export const onChangeAmount = StableDomain.createEvent<string>();
export const changeAmount = onChangeAmount.map((amount) => bn(amount));

export const focusAmount = StableDomain.createEvent<React.SyntheticEvent>();
export const blurAmount = StableDomain.createEvent<React.SyntheticEvent>();

// year

export const $year = StableDomain.createStore<YearInMonths>(YearInMonths.One);
export const changeYear = StableDomain.createEvent<YearInMonths>();

export const $isCapitalization = StableDomain.createStore(false);
export const toggleIsCapitalization = StableDomain.createEvent<boolean>();

export const $capitalization: Store<Capitalization> =
	$isCapitalization.map(Number);

export const $nameErrors = combine(
	{
		minLen: $name.map((name) => (!name.length ? 'Stable:enterTitle' : null)),
		maxLen: $name.map((name) =>
			name.length > 30 ? 'Stable:maxLengthNameError' : null
		),
	},
	({ minLen, maxLen }) => [minLen, maxLen].filter(Boolean)
);

export const $balanceByCurrency = combine(
	$wallets,
	$currency,
	(wallets, currency) => {
		const fund = `${currency}_wallet`;
		const { balance } = wallets.find((wallet) => wallet.fund === fund)!;
		return bn(balance.sum);
	}
);

export const $oneUsd = sample({
	source: [$currency, $user],
	fn: ([currency, { course }]) => {
		if (currency === Currency.USDT) {
			return 1;
		} else if (currency === Currency.BTC) {
			return fixNumber(1 / Number(course.bitcoin_usdt), currency);
		} else if (currency === Currency.ETH) {
			return fixNumber(1 / Number(course.ethereum_usdt), currency);
		}
	},
});

export const $amountErrors = combine(
	{
		min: combine($amount, $oneUsd, $currency, (amount, oneUsd, currency) => {
			if (amount.lte(0)) return 'Stable:enterAmount';
			if (amount.lt(oneUsd)) return i18n.t('Stable:minAmountError', { amount: oneUsd, currency: Sign[currency] });
			return null;
		}),
		required: $amount.map((amount) =>
			amount.isEqualTo(bn(0)) ? 'Stable:enterAmount' : null
		),
		invalid: $strAmount.map((amount) =>
			!NUMBER_REGEX.test(amount)
				? 'Stable:amountIsInvalidError'
				: null || [...amount].filter((char) => char === '.').length > 1
					? 'Stable:amountIsInvalidError'
					: null
		),
		isNaN: $amount.map((amount) => amount.isNaN() || !amount.isFinite() ? 'Stable:amountIsInvalidError' : null),
		notEnoughFunds: combine($balanceByCurrency, $amount, (balance, amount) =>
			bn(balance).lt(amount) ? 'Stable:notEnoughFundsError' : null
		),
	},
	({ required, invalid, isNaN, notEnoughFunds, min }) =>
		[required, invalid, isNaN, notEnoughFunds, min].filter(Boolean)
);

export const $rateErrors = combine(
	{
		wrongRate: combine($year,
			$currency,
			$rates,
			$capitalization,
			(term, currency, rates, capitalization) =>
				rates[capitalization][currency][term] <= 0
					? 'Stable:rateInvalidValue'
					: null
		)
	}, ({ wrongRate }) => [wrongRate].filter(Boolean)
);

export const $isFormValid = combine(
	[$nameErrors, $amountErrors, $rateErrors],
	(errors) => !errors.flat().length
);

// request

export const $form = combine(
	{
		title: $name,
		term: $year,
		amount: $amount,
		is_capitalization: $capitalization,
		currency: $currency,
		rates: $rates,
	});

// calculation

export const calcNetIncomeFx = StableDomain.createEffect<
	CalculationData,
	BigNumber
>();
export const calcMonthIncomeFx = StableDomain.createEffect<
	CalculationData,
	BigNumber
>();

export const calcNetIncomeWithCapFx = StableDomain.createEffect<
	CalculationData,
	BigNumber
>();
export const calcFinalAmountWithCapFx = StableDomain.createEffect<
	CalculationData,
	BigNumber
>();

export const $netIncome = $form.map(calcNetIncome);
export const $monthIncome = $form.map(calcMonthIncome);
export const $netIncomeWithCap = $form.map(calcNetIncomeWithCap);
export const $finalAmountWithCap = $form.map(calcFinalAmountWithCap);

// requests

export const redirectToAccountsFx = StableDomain.createEffect();

export const createStableRequest =
	StableDomain.createEvent<StableCreateDto>();
export const createStableRequestFx = StableDomain.createEffect<
	StableCreateDto,
	ResponseDone<{ code: 'ok' }>,
	ResultFail
>();

export const createStable = StableDomain.createEvent<React.SyntheticEvent>();

export const successCreateStable = StableDomain.createEvent();

// debug

/* export const $calculation = combine({
	netIncome: $netIncome,
	monthIncome: $monthIncome,
	netIncomeWithCap: $netIncomeWithCap,
	finalAmountWithCap: $finalAmountWithCap,
	currency: $currency
}).watch(incomes => log('$stables/create', incomes)); */

