import { AppDomain } from "@store/app";
import { Coin, Network } from "./types";

// coin
export const $selectedCoin = AppDomain.createStore<Coin | null | undefined>(null);
export const selectCoin = AppDomain.createEvent<Coin | null | undefined>();

// network
export const $selectedNetwork = AppDomain.createStore<Network | null>(null);
export const selectNetwork = AppDomain.createEvent<Network | null>();

// show

export const $showCoins = AppDomain.createStore<Coin[]>([]);