import { AxiosResponse } from 'axios';
import { createEvent, createStore, createEffect, combine } from 'effector';
import {
  CancelTransferRequestFxDone,
  CancelTransferRequestFxFail,
  FetchRequestsFxFail,
  Request,
} from './types';

export const $requests = createStore<Request[]>([]);
export const $prevRequests = createStore<Request[]>([]);

export const $isRequestsLoaded = createStore(false);

export const fetchRequests = createEvent<void>();
export const fetchRequestsFx = createEffect<
  void,
  AxiosResponse<{ requests: Request[] }>,
  FetchRequestsFxFail
>();
export const waitBetweenFetchRequestsFx = createEffect<void, void>();
export const abortPollingRequests = createEvent();
export const reFetchRequests = createEvent();

export const $openedRequestId = createStore<Request['id'] | null>(null);
export const changeRequestId = createEvent<Request['id']>();
export const $openedRequest = combine(
  $requests,
  $openedRequestId,
  (requests, id) => requests.find((req) => req.id === id)
);

export const $canCancelTransaction = combine(
  $requests.map(requests => requests.map(({ id }) => id)),
  $openedRequestId,
  (requests, id) => id && requests.includes(id)
)

export const pressCancelTransferRequest = createEvent<{ id: Request['id'] }>();
export const cancelTransferRequestFx = createEffect<
  { id: Request['id'] },
  CancelTransferRequestFxDone,
  CancelTransferRequestFxFail
>();
