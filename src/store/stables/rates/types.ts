import { Currency } from "@constants/funds";

export enum YearInMonths {
	One = 12,
	Two = 24,
	Three = 36,
	Five = 60,
	Eight = 96,
}

export const YEARS = [
	YearInMonths.One,
	YearInMonths.Two,
	YearInMonths.Three,
	YearInMonths.Five,
	YearInMonths.Eight,
];


export enum Capitalization {
	Without = 0,
	With
}

export type Rate = {
	[key: string]: {
		[key: number]: number
	}
}

export type Rates = {
	0: { [key: string]: { [key: number]: number } },
	1: { [key: string]: { [key: number]: number } }
}

/* export type Rate = {
	[Currency.BTC]: { [YearInMonths.One]: number, [YearInMonths.Two]: number, [YearInMonths.Three]: number, [YearInMonths.Five]: number, [YearInMonths.Eight]: number },
	[Currency.ETH]: { [YearInMonths.One]: number, [YearInMonths.Two]: number, [YearInMonths.Three]: number, [YearInMonths.Five]: number, [YearInMonths.Eight]: number },
	[Currency.USDT]: { [YearInMonths.One]: number, [YearInMonths.Two]: number, [YearInMonths.Three]: number, [YearInMonths.Five]: number, [YearInMonths.Eight]: number },
} */

export const RATES: Rates = {
	[Capitalization.Without]: {
		[Currency.BTC]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
		[Currency.ETH]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
		[Currency.USDT]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
	},
	[Capitalization.With]: {
		[Currency.BTC]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
		[Currency.ETH]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
		[Currency.USDT]: { [YearInMonths.One]: 0, [YearInMonths.Two]: 0, [YearInMonths.Three]: 0, [YearInMonths.Five]: 0, [YearInMonths.Eight]: 0 },
	},
};


/* export const rates = {
	[Capitalization.Without]: {
		[Currency.BTC]: { [YearInMonths.One]: 0.011, [YearInMonths.Two]: 0.013, [YearInMonths.Three]: 0.015, [YearInMonths.Five]: 0.017, [YearInMonths.Eight]: 0.021 },
		[Currency.ETH]: { [YearInMonths.One]: 0.019, [YearInMonths.Two]: 0.022, [YearInMonths.Three]: 0.025, [YearInMonths.Five]: 0.028, [YearInMonths.Eight]: 0.034 },
		[Currency.USDT]: { [YearInMonths.One]: 0.03, [YearInMonths.Two]: 0.035, [YearInMonths.Three]: 0.04, [YearInMonths.Five]: 0.045, [YearInMonths.Eight]: 0.055 },
	},
	[Capitalization.With]: {
		[Currency.BTC]: { [YearInMonths.One]: 0.013, [YearInMonths.Two]: 0.015, [YearInMonths.Three]: 0.017, [YearInMonths.Five]: 0.019, [YearInMonths.Eight]: 0.023 },
		[Currency.ETH]: { [YearInMonths.One]: 0.022, [YearInMonths.Two]: 0.025, [YearInMonths.Three]: 0.028, [YearInMonths.Five]: 0.031, [YearInMonths.Eight]: 0.037 },
		[Currency.USDT]: { [YearInMonths.One]: 0.035, [YearInMonths.Two]: 0.04, [YearInMonths.Three]: 0.045, [YearInMonths.Five]: 0.05, [YearInMonths.Eight]: 0.06 },
	},
}; */