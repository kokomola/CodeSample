import { fetchStables } from '@store/stables';
import { endpoints } from '@constants/endpoints';
import { blurStableCreateScreen, focusStableCreateScreen } from '@store/app';
import { $verifyEndpoint, changeVerifyEndpoint, changeVerifyRedirectScreen, changeVerifyRequestDomain, initVerifyBottomSheet, openVerifyBottomSheet, resetVerifyCode, successVerifyCode } from '@store/verify';
import { signedRequest } from '@utils/agent';
import { log, logline } from '@utils/debug';
import { forward, guard, sample, split } from 'effector';

import {
	$amount,
	$form,
	$year,
	calcNetIncomeFx,
	calcNetIncomeWithCapFx,
	calcMonthIncomeFx,
	changeAmount,
	changeYear,
	$isCapitalization,
	toggleIsCapitalization,
	calcFinalAmountWithCapFx,
	blurAmount,
	$amountTouched,
	focusAmount,
	$amountInFocus,
	$strAmount,
	onChangeAmount,
	$name,
	changeName,
	$nameInFocus,
	focusName,
	$nameTouched,
	blurName,
	createStableRequestFx,
	createStable,
	createStableRequest,
	successCreateStable,
	$currency,
	changeCurrency,
} from './index';
import { calcFinalAmountWithCap, calcMonthIncome, calcNetIncome, calcNetIncomeWithCap } from '@utils/stableCalc';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';

// name
$name.on(changeName, (_, name) => name).reset(blurStableCreateScreen);
$nameInFocus
	.on(focusName, () => true)
	.reset(blurName, blurStableCreateScreen, successVerifyCode);
$nameTouched.on(blurName, () => true).reset(blurStableCreateScreen);

$strAmount.on(onChangeAmount, (_, amount) => amount).reset(blurStableCreateScreen);
$amountInFocus
	.on(focusAmount, () => true)
	.reset(blurAmount, blurStableCreateScreen, successVerifyCode);
$amountTouched.on(blurAmount, () => true).reset(blurStableCreateScreen);
$amount.on(changeAmount, (_, amount) => amount).reset(blurStableCreateScreen);

$currency.on(changeCurrency, (_, currency) => currency);

$year.on(changeYear, (_, year) => year);

$isCapitalization.on(
	toggleIsCapitalization,
	(_, isCapitalization) => isCapitalization
);

calcNetIncomeFx.use(calcNetIncome);

calcMonthIncomeFx.use(calcMonthIncome);

calcNetIncomeWithCapFx.use(calcNetIncomeWithCap);

calcFinalAmountWithCapFx.use(calcFinalAmountWithCap);

split({
	source: $form,
	match: {
		wCap: ({ is_capitalization }) => Boolean(is_capitalization),
	},
	cases: {
		wCap: [calcNetIncomeWithCapFx, calcFinalAmountWithCapFx],
		__: [calcMonthIncomeFx, calcNetIncomeFx],
	},
});


// Setting verification

forward({
	from: focusStableCreateScreen,
	to: [
		initVerifyBottomSheet,
		changeVerifyEndpoint.prepend(() => endpoints.stable.verify),
		changeVerifyRequestDomain.prepend(() => 'Stable'),
		changeVerifyRedirectScreen.prepend(() => 'Accounts'),
	],
});

forward({
	from: blurStableCreateScreen,
	to: resetVerifyCode,
});


forward({
	from: createStableRequestFx.done,
	to: openVerifyBottomSheet,
});

// Request
sample({
	clock: createStable,
	source: $form,
	fn: (form, _) => {
		const { title, term, is_capitalization, currency } = form;
		const amount = form.amount.toFixed(8).toString();
		return { title, term, amount, is_capitalization, currency };
	},
	target: createStableRequest,
});

forward({
	from: createStableRequest,
	to: createStableRequestFx,
});

createStableRequestFx.use((body) => {
	const method = 'post';
	const url = endpoints.stable.create;

	return signedRequest({ method, url, body });
});

guard({
	clock: successVerifyCode,
	source: $verifyEndpoint,
	filter: (endpoint) => endpoint === endpoints.stable.verify,
	target: successCreateStable,
});

forward({
	from: successCreateStable,
	to: fetchStables,
});

/* $oneUsd.watch((minimum) => logline('[$mimnimum]', { minimum }))
$amountErrors.watch(amountErrors => logline('[$stable]', { amountErrors })) */