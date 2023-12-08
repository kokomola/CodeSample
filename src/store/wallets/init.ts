import { defaultAccounts } from './constants';
import {
  $accounts,
  fetchWalletsFx,
  POLLING_INTERVAL,
  stopWalletsPolling,
  delayBetweenWalletsPollsFx,
  pollWalletsFx,
  $isAccountsLoaded,
  $walletByFund,
  $wallets,
} from '@store/wallets/index';
import { forward } from 'effector';
import { log, logline } from '@utils/debug';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
/* import store from 'src/redux/configureStore';
import { fetchWallets } from 'src/redux/ducks/account/wallets'; */

$isAccountsLoaded.on(fetchWalletsFx.done, () => true);

fetchWalletsFx.use(async () => {
  const method = 'get';
  const url = endpoints.account.fetchWallets;
  return signedRequest({ method, url });
});

$accounts.on(
  fetchWalletsFx.doneData,
  (_, response) => response?.data || defaultAccounts
);

delayBetweenWalletsPollsFx.use(async () => {
  await new Promise((resolve, reject) => {
    const timeoutID = setTimeout(resolve, POLLING_INTERVAL);

    const unwatch = stopWalletsPolling.watch(() => {
      unwatch();
      clearTimeout(timeoutID);
      reject(new Error('Error in delay between wallets polls'));
    });
  });
});

forward({
  from: pollWalletsFx.done.map(({ params }) => params),
  to: delayBetweenWalletsPollsFx,
});

forward({
  from: delayBetweenWalletsPollsFx.done.map(({ params }) => params),
  to: pollWalletsFx,
});

// debug

//$wallets.watch(wallets => log('$store/wallets', { wallets }))

