import { forward } from 'effector';
import { initChildBS } from '@store/bottomSheetCommon';
import i18n from '@utils/i18n';
import {
  $isRequestsLoaded,
  $openedRequestId,
  $requests,
  abortPollingRequests,
  cancelTransferRequestFx,
  fetchRequests,
  fetchRequestsFx,
  pressCancelTransferRequest,
  reFetchRequests,
  waitBetweenFetchRequestsFx,
} from '@store/requests/index';
import { $prevRequests, changeRequestId } from './index';
import { showSuccess } from '@store/alert';
import { focusAmirFinanceScreen, focusRequestsScreen } from '@store/app';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';
import { Request } from './types';

$openedRequestId.on(changeRequestId, (_, id) => id);

$isRequestsLoaded.on(fetchRequestsFx.done, () => true);

forward({
  from: [focusAmirFinanceScreen, focusRequestsScreen],
  to: [fetchRequests],
});

forward({
  from: fetchRequests,
  to: fetchRequestsFx,
});

fetchRequestsFx.use(async () => {
  const method = 'get';
  const url = endpoints.account.fetchRequests;
  return signedRequest({ method, url });
});

waitBetweenFetchRequestsFx.use(async () => {
  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, 5000);
    const unwatch = abortPollingRequests.watch(() => {
      unwatch();
      clearTimeout(timeoutId);
      reject(new Error('abortPollingRequests error'));
    });
  });
});

forward({
  from: fetchRequestsFx.done,
  to: waitBetweenFetchRequestsFx,
});

forward({
  from: waitBetweenFetchRequestsFx.done,
  to: fetchRequestsFx,
});

$requests.on(fetchRequestsFx.doneData, (oldRequests, response) => {
  const isEqual = (req1: Request[], req2: Request[]) =>
    JSON.stringify(req1) === JSON.stringify(req2);
  const requests = response.data.requests;
  return isEqual(oldRequests, requests) ? oldRequests : requests;
});
$prevRequests.on($requests.updates, (requests) => requests);

// cancel transfer request

forward({
  from: pressCancelTransferRequest,
  to: cancelTransferRequestFx,
});

cancelTransferRequestFx.use(async ({ id }) => {
  const method = 'post';
  const url = endpoints.transfer.cancel(id);

  return signedRequest({ method, url });
});

forward({
  from: [cancelTransferRequestFx.done],
  to: [
    reFetchRequests,
    showSuccess.prepend(() => ({
      title: i18n.t('requestsStore:cancelTransferSuccessTitle'),
      message: i18n.t('requestsStore:cancelTransferSuccessMessage'),
      buttons: [{ text: i18n.t('requestsStore:cancelTransferSuccessOk') }],
    })),
  ],
});

forward({
  from: reFetchRequests,
  to: [abortPollingRequests, fetchRequests],
});
