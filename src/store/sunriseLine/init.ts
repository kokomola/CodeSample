import { forward, guard, sample } from 'effector';

import { endpoints } from '@constants/endpoints';
import { focusSunriseLineScreen } from '@store/app';
import { initChildBS } from '@store/bottomSheetCommon';
import { $date } from '@store/sunriseStructure';
import { signedRequest } from '@utils/agent';
import { getNextDay } from '@utils/common/date';
import { log } from '@utils/debug';
import { bn } from '@utils/numbers/bn';
import { routes } from 'src/navigator/routes';
import * as RootNavigation from '../../navigator/RootNavigation';
import {
  $lineOfAMonth,
  $selectedLevel,
  fetchLineOfAMonthRequestFx,
  redirectToScreenLineFx,
  selectLevel,
  updateLineOfAMonth,
  $selectedDatePicker,
  selectDateByPicker,
} from './index';

$lineOfAMonth.on(updateLineOfAMonth, (_, account) =>
  account.map(({ date, btc, eth, usdt, sum }) => ({
    date: new Date(date),
    btc: bn(btc),
    eth: bn(eth),
    usdt: bn(usdt),
    sum: bn(sum),
  }))
);

$selectedLevel.on(selectLevel, (_, level) => level);

// Fetch date

sample({
  clock: selectLevel,
  source: $date,
  fn: (date, level) => ({ date, level }),
  target: fetchLineOfAMonthRequestFx,
});

fetchLineOfAMonthRequestFx.use(({ date, level }) => {
  const method = 'get';

  const [startDate, endDate] = date;
  const offset = endDate.getTimezoneOffset() * 60000;
  const nextDay = getNextDay(startDate);
  const from = Math.floor((nextDay.getTime() + offset) / 1000);
  const to = Math.floor((endDate.getTime() + offset) / 1000);

  const url = endpoints.sunrise.fetchDynamicStructureByLevel(from, to, level);

  return signedRequest({ method, url });
});

forward({
  from: fetchLineOfAMonthRequestFx.doneData.map((r) => r.data.data),
  to: updateLineOfAMonth,
});

// Redirect to the LineScreen after select the line level

guard({
  clock: selectLevel,
  filter: (level) => !!level,
  target: redirectToScreenLineFx,
});

redirectToScreenLineFx.use(() => {
  RootNavigation.navigate(routes.sunriseTab.line);
});

// For date picker

$selectedDatePicker
  .on(selectDateByPicker, (_, date) => date)
  .on($lineOfAMonth, (_, month) =>
    month.length > 0 ? month[0].date : new Date()
  );
//.watch((d) => logline('$selectedDatePicker', d));

forward({
  from: focusSunriseLineScreen,
  to: initChildBS.prepend(() => ({
    fcKey: 'SunriseDetailWithDatePicker',
    height: 300,
  })),
});
