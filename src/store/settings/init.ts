import { endpoints } from '@constants/endpoints';
import { $settings, fetchSettingsFx } from '@store/settings/index';
import { signedRequest } from '@utils/agent';
import { ResponseSettings, Settings } from './types';

export const _transformSettings = (settings: ResponseSettings): Settings => ({
  ...settings,
  sollarCourse: settings.solar_course,
  transferComissionRate: settings.transferComissionRate,
});

fetchSettingsFx.use(async () => {
  const url = endpoints.settings.fetchDefault;
  return signedRequest({ url });
});

$settings.on(fetchSettingsFx.doneData, (_, response) =>
  _transformSettings(response.data.data)
);
