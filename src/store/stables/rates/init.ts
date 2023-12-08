import { focusAmirFinanceScreen } from '@store/app';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { log } from '@utils/debug';
import { forward, sample } from 'effector';
import {
	$rates,
	fetchStableRatesRequestFx,
	fetchStableRatesWithCapRequestFx,
	transformDto,
} from './index';
import { Capitalization, Rate, RATES, YEARS } from './types';
import { Currency } from '@constants/funds';

$rates.on(transformDto.doneData, (oldRates, rates) => ({ ...oldRates, ...rates }))

transformDto.use(({ oldRates, capitalization, rate }) => {
	if (!rate || !rate[Currency.BTC]) return oldRates;
	const newRates = RATES[capitalization];
	[Currency.BTC, Currency.ETH, Currency.USDT].map((coin) => {
		YEARS.map((year) => newRates[coin][year] = +rate[coin][year]);
	});
	return { ...oldRates, [capitalization]: newRates };
});

// init requests

forward({
	from: focusAmirFinanceScreen,
	to: [fetchStableRatesRequestFx, fetchStableRatesWithCapRequestFx],
});

sample({
	clock: fetchStableRatesRequestFx.doneData,
	source: $rates,
	fn: (rates, response) => ({ rates, rate: response?.data?.data, capitalization: Capitalization.Without }),
	target: transformDto,
})

sample({
	clock: fetchStableRatesWithCapRequestFx.doneData,
	source: $rates,
	fn: (rates, response) => ({ rates, rate: response?.data?.data, capitalization: Capitalization.With }),
	target: transformDto,
})

// requests

fetchStableRatesRequestFx.use(() => {
	const url = endpoints.stable.fetchRates;

	return signedRequest({ url });
});

fetchStableRatesWithCapRequestFx.use(() => {
	const url = endpoints.stable.fetchRatesWithCap;

	return signedRequest({ url });
});

// debug

//$rates.watch(rates => log('[$rates]', rates));
