import i18n from '@utils/i18n';
import { serverErrorFx } from './index';
import { showErrorFx } from '@store/alert';

export const Domains = {
	Account: 'AccountDomain',
	Kyc: 'KycDomain',
	Permission: 'PermissionDomain',
	Redirect: 'RedirectDomain',
	ReferralLink: 'ReferralLinkDomain',
	SecurityService: 'SecurityServiceDomain',
	Server: 'ServerDomain',
	Shop: 'Shop',
	Stable: 'StableDomain',
	Sunrise: 'Sunrise',
	TokenSale: 'TokenSale',
	Transfer: 'Transfer',
	TwoFa: 'twoFaDomain',
	Withdraw: 'Withdraw',
	Deposit: 'DepositDomain',
};

export const ERRORS = {
	noDeviceToken: ['login_no_device_token', 'login_invalid_sign'],
	invalidToken: ['invalid_sign'],
	invalidAccessToken: 'access_token_invalid',
	excepts: [
		'invalid hash',
		"Can't get kyc token for the verified account",
		'Internal Server Error',
		'btc_too_big_amount',
		'eth_too_big_amount',
		'usdt_too_big_amount',
		'cannot_use_withdraw_yet',
		'failed getting globalpass screening result',
		'Not found',
		"Cannot read properties of undefined (reading 'dividedBy')",
	],
};

export type Error = {
	statusCode: Array<number>,
	fn: (shortDomain: string, errorName?: string | null) => void
}

export const _ERRORS: Error[] = [
	{ statusCode: [503], fn: () => serverErrorFx('503 Server error') },
	{ statusCode: [502], fn: () => serverErrorFx('502 Gateway error') },
	{
		statusCode: [500],
		fn: (shortDomain, message) => {
			const _message = message ? i18n.t(`AppDomainErrors:${message}`) : i18n.t(`ServerDomainErrors:${shortDomain}`);
			const serverError = i18n.t(`ServerDomainErrors:${shortDomain}_message`);
			showErrorFx({ title: '', message: `${serverError}. ${_message}` });
		},
	},
];
