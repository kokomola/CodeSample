import {
  $date,
  $tree,
  changeDate,
  changeTree,
  fetchTreeRequestFx,
} from './index';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';
import { forward, sample } from 'effector';
import { sunriseGate } from '@store/sunrise';
import { logline } from '@utils/debug';

$date.on(changeDate, (_, date) => date); //.watch((d) => logline('[date]', { d }));

$tree.on(changeTree, (_, tree) => tree); //.watch((t) => log('[$tree]', t));

//$lines.watch((lines) => log('[lines]', lines));
//$levels.watch((l) => log('[$levels]', l));
//$children.watch((c) => log('[$children]', c));

sample({
  clock: sunriseGate.open,
  source: $date,
  target: fetchTreeRequestFx,
});

forward({
  from: changeDate,
  //to: [fetchTreeRequestFx, selectDateByPicker.prepend(() => null)],
  to: fetchTreeRequestFx,
});

fetchTreeRequestFx.use(([_, end]) => {
  const method = 'get';

  const offset = end.getTimezoneOffset() * 60000;
  const unix = Math.floor((end.getTime() + offset) / 1000);
  const url = endpoints.sunrise.fetchTreeToDate(unix);

  return signedRequest({ method, url });
});

forward({
  from: fetchTreeRequestFx.doneData.map((r) => r.data),
  to: changeTree,
});
