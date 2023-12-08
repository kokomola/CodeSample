import { ResponseDone } from '@store/api/types';
import { SunriseDomain } from '@store/app';
import { $lines } from '@store/sunriseStructure';
import { isEqualDates } from '@utils/common/date';
import { combine } from 'effector';
import { LineOfADay, Point } from './types';

export const $lineOfAMonth = SunriseDomain.createStore<LineOfADay[]>([]);
export const $haveDynamic = $lineOfAMonth.map((month) => month.length > 0);

export const $chart = $lineOfAMonth.map((month) =>
  month.reduce((prevDays: Point[], currentDay: LineOfADay, index: number) => {
    const { date, sum } = currentDay;
    const prevDay = month[index - 1];
    const nextDay = month[index + 1];
    const isSkip =
      prevDay &&
      nextDay &&
      prevDay.sum.isEqualTo(currentDay.sum) &&
      nextDay.sum.isEqualTo(currentDay.sum);
    const newPoint: Point = {
      x: date.getTime() / 1000,
      y: sum.toNumber(),
      index,
    };
    return isSkip ? [...prevDays] : [...prevDays, newPoint];
  }, [])
);

export const $range = $lineOfAMonth.map((month) =>
  month?.length
    ? { first: month[0].date, last: month[month.length - 1].date }
    : { first: undefined, last: undefined }
);

export const updateLineOfAMonth = SunriseDomain.createEvent<LineOfADay[]>();

export const $selectedLevel = SunriseDomain.createStore<number | null>(null);
export const selectLevel = SunriseDomain.createEvent<number>();

export const fetchLineOfAMonthRequestFx = SunriseDomain.createEffect<
  {
    date: [Date, Date];
    level: number;
  },
  ResponseDone<LineOfADay[]>
>();

export const redirectToScreenLineFx = SunriseDomain.createEffect();

// For date picker

export const $selectedLine = combine($lines, $selectedLevel, (lines, level) => {
  return lines.find((line) => line.level === level);
});

export const $selectedDatePicker = SunriseDomain.createStore<Date>(new Date());

export const selectDateByPicker = SunriseDomain.createEvent<Date>();

export const $detailByDate = combine(
  $lineOfAMonth,
  $selectedDatePicker,
  (month, selectedDate) => {
    if (selectedDate) {
      const found = month.find(({ date }) => isEqualDates(date, selectedDate));
      return found;
    }
    return month[0];
  }
);

//$detailByDate.watch((d) => logline('[$detalByDate]', d));
