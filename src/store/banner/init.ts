import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { log } from '@utils/debug';
import { $banners, fetchBannersFx } from './index';

fetchBannersFx.use(() => {
	const method = 'get';
	const url = endpoints.banners.getBanners;
	return signedRequest({ url, method });
});

$banners.on(fetchBannersFx.doneData, (_, response) => response.data.data);

//$banners.watch(banners => log('$[store]/banner', { banners }))