import { $bannersObj, fetchBannersFx } from '@store/shopBanner/index';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { forward } from 'effector';
import { ShopGate } from '@store/shop';
import { logline } from '@utils/debug';

forward({
  from: ShopGate.open,
  to: fetchBannersFx,
});

fetchBannersFx.use(async () => {
  const method = 'get';
  const url = endpoints.shop.banners;

  return signedRequest({ method, url });
});

$bannersObj.on(fetchBannersFx.doneData, (_, response) => response.data.data);

// debug

//$bannersObj.watch((bannerObj) => logline('[shopBanner]', { bannerObj }))