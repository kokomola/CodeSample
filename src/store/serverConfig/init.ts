import { forward } from 'effector';
import {
  $serverConfig,
  fetchServerConfig,
  fetchServerConfigFx,
} from '@store/serverConfig/index';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';

$serverConfig.on(fetchServerConfigFx.doneData, (_, config) => config);

forward({
  from: fetchServerConfig,
  to: fetchServerConfigFx,
});

fetchServerConfigFx.use(async () => {
  const method = 'get';
  const url = endpoints.app.fetchServerConfig;

  const response = await signedRequest({ method, url });

  return response.data.data;
});
