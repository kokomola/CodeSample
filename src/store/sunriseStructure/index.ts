import { combine } from 'effector';
import { AxiosResponse } from 'axios';
import { SunriseDomain } from '@store/app';
import { Tree, defaultTree, Line, Level } from './types';

export const $date = SunriseDomain.createStore<[Date, Date]>([
  new Date(),
  new Date(),
  // temp,
  //new Date(2021, 4, 30),
  //getLastDayOfMonth(new Date(2021, 4, 30)),
]);
export const changeDate = SunriseDomain.createEvent<[Date, Date]>();

export const $tree = SunriseDomain.createStore<Tree>(defaultTree);
export const $children = $tree.map((tree) => tree.children);
export const $levels = $tree.map((tree) => tree.levels);

export const $lines = combine($date, $tree, ([startDate, endDate], tree) => {
  const { children, levels } = tree;
  if (!levels) return [];
  return Object.values(levels).reduce(
    (lines: Line[], level: Level, index: number) => {
      const levelName = index + 1;
      const newLines = [...lines];
      const allChildren = children.filter(
        ({ level, registration_date: rd }) =>
          level === levelName && new Date(rd) <= endDate
      );
      const newChildren = allChildren.filter(({ registration_date: rd }) => {
        return (
          !!endDate &&
          new Date(rd).getMonth() + 1 === endDate?.getMonth() &&
          new Date(rd).getFullYear() === endDate?.getFullYear()
        );
      });
      if (level) {
        const { min, current } = level;
        // increase
        const isIncrease = !!current && current > min ? true : undefined;
        const isDecrease = !!current && current < min ? false : undefined;
        const increase = isIncrease || isDecrease;
        // new line
        newLines.push({
          min,
          current,
          children: allChildren,
          allChildren: allChildren.length,
          newChildren: newChildren.length,
          increase,
          level: levelName,
        });
      }
      return newLines;
    },
    []
  );
});

export const changeTree = SunriseDomain.createEvent<Tree>();
export const fetchTreeRequestFx = SunriseDomain.createEffect<
  [Date, Date],
  AxiosResponse<Tree>
>();
