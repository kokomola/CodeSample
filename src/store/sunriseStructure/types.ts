/* eslint-disable camelcase */
import { BigNumber } from 'bignumber.js';

export const defaultTree: Tree = {
  parent: { name: '', phone: '+7', email: '' },
  ambassador: { name: '', phone: '+7', email: '' },
  closestAmbassador: { name: '', id: 0, email: '' },
  children: [],
  levels: {},
};

export type Tree = {
  date?: Date;
  parent: Parent;
  ambassador: Ambassador;
  closestAmbassador: ClosestAmbassador;
  children: TreeChild[];
  levels: {
    level1?: Level;
    level2?: Level;
    level3?: Level;
    level4?: Level;
    level5?: Level;
  };
};

export type Level = { min: BigNumber; current?: BigNumber };

export type TreeChild = {
  id: number;
  level: number;
  name: string;
  parent_id: number;
  registration_date: Date;
  sunrise_joined: boolean | null;
  ambassador_level: number;
  status: 'zero' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'brilliant';
  parent_name: string;
  status_updated_at: null | string;
  phone: null | string;
  email: null | string;
};

export type Line = {
  current?: BigNumber;
  min: BigNumber;
  children: TreeChild[];
  increase?: boolean;
  allChildren?: number;
  newChildren?: number;
  level: number;
};

export type Parent = {
  name: string;
  phone: string | null;
  email: string | null;
};

export type Ambassador = {
  name: string;
  phone: string | null;
  email: string | null;
};

type ClosestAmbassador = {
  email: string | null;
  id: number;
  name: string | null;
};
