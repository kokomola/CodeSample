import { AxiosResponse } from 'axios';
import { combine, createEffect, createEvent, createStore } from 'effector';

export const focusReinvestmentView = createEvent();
export const blurReinvestmentView = createEvent();

export const $savingBtc = createStore(0);
export const $savingEth = createStore(0);
export const $savingUsdt = createStore(0);
export const $stable = createStore(0);
export const $partner = createStore(0);

export const changeSavingBtc = createEvent();
export const changeSavingEth = createEvent();
export const changeSavingUsdt = createEvent();
export const changeStable = createEvent();
export const changePartner = createEvent();

export const $form = combine(
  $savingBtc,
  $savingEth,
  $savingUsdt,
  $stable,
  $partner,
  (savingBtc, savingEth, savingUsdt, stable, partner) => ({
    savings: {
      btc: savingBtc,
      eth: savingEth,
      usdt: savingUsdt,
    },
    stable,
    partner,
  })
);

type Form = {
  savings: {
    btc: number;
    eth: number;
    usdt: number;
  };
  stable: number;
  partner: number;
};

export const save = createEvent();
export const updateReinvestmentFx = createEffect<Form, AxiosResponse>();
