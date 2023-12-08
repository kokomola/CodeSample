import { AppDomain } from '@store/app';
import { AxiosResponse } from 'axios';
import { ResponseSettings, Settings } from './types';

export const $settings = AppDomain.createStore<Settings>(
  {
    sollarCourse: '',
    transferComissionRate: 0.0025,
  },
  { name: '$settings' }
);

export const fetchSettingsFx = AppDomain.createEffect<
  void,
  AxiosResponse<{ data: ResponseSettings }>
>();
