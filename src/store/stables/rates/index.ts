import { StableDomain } from "@store/app";
import { AxiosResponse } from "axios";
import { Capitalization, Rate, Rates, RATES } from "./types";

export const $rates = StableDomain.createStore(RATES);

export const fetchStableRatesRequestFx = StableDomain.createEffect<void, AxiosResponse<{ data: Rate }>>();
export const fetchStableRatesWithCapRequestFx = StableDomain.createEffect<void, AxiosResponse<{ data: Rate }>>();

export const transformDto = StableDomain.createEffect<{ oldRates: Rates, capitalization: Capitalization, rate?: Rate }, Rates>();
