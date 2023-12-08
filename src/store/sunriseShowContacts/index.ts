/* eslint-disable camelcase */
import { SunriseDomain } from '@store/app';
import { $user } from '@store/user';
import { AxiosResponse } from 'axios';

export const $isShowAccount = $user.map((user) => user.allow_show_contacts);

export const $isShowInterface = SunriseDomain.createStore<boolean | null>(null);

export const toggleShowInterface = SunriseDomain.createEvent<boolean>();

export const toggleShowRequest = SunriseDomain.createEvent<boolean>();

export const allowShowContactsRequestFx = SunriseDomain.createEffect<
  { allow_show_contacts: boolean },
  AxiosResponse<{ code: 'ok' }>
>();
