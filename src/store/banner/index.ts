import { ResponseDone } from '@store/api/types';
import { AppDomain } from '@store/app';
import { Banner } from './types';

export const $banners = AppDomain.createStore<Banner[]>([]);
export const fetchBannersFx = AppDomain.createEffect<
	void,
	ResponseDone<Banner[]>
>();