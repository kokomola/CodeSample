import { ResponseDone } from '@store/api/types';
import { AccountDomain } from '@store/app';
import { $awtTokenWalletType } from '@store/tokenSaleWallet';
import { $courses, $user } from '@store/user';
import { $wallets } from '@store/wallets';
import { fundToTicker } from '@utils/maps';
import { combine } from 'effector';

export const $limitPerDay = AccountDomain.createStore(0);
export const $refetch = AccountDomain.createStore(false);
export const changeRefetch = AccountDomain.createEvent<boolean>();
export const $idx = AccountDomain.createStore(0);

const $selectedAccount = combine(
  $wallets,
  $idx,
  $awtTokenWalletType,
  (wallets, idx, awtToken) => {
    return [...wallets, awtToken].filter(Boolean)[idx];
  }
);

export const $limitPerDayInSelectedAccount = combine(
  $limitPerDay,
  $courses,
  $selectedAccount,
  $user,
  (limit, courses, account, user) => {
    if (user?.is_verified) {
      return -1;
    }
    if (account) {
      const { fund } = account;
      if (fund !== 'awt_wallet') {
        const ticker = fundToTicker[account?.fund as keyof typeof fundToTicker];
        const usdt = courses[ticker.toLowerCase() as keyof typeof courses].usdt;
        return limit / +usdt;
      }
    }
    // TODO: Don't have AWT price in USDT
    return -1;
  }
);

export const fetchLimitPerDayFx = AccountDomain.createEffect<
  void,
  ResponseDone<{ withdraw_limits: { limitUSDT: number; remnant: number } }>
>();
