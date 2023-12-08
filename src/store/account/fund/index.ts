import { Account, Fund } from '@constants/funds';
import { AccountDomain } from '@store/app/index';

export const $fund = AccountDomain.createStore<Fund | null>(null);
export const selectFund = AccountDomain.createEvent<Fund | null>();

export const selectFundAndCoin = AccountDomain.createEvent<{
  fund: Fund | null;
  coin: Fund | null;
}>();

export const $chosendAccount = AccountDomain.createStore<Account | null>(
  Account.Wallet
);
