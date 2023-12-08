import { AxiosResponse } from "axios";
import { SunriseDomain } from "@store/app";
import { $user } from "@store/user";
import { logline } from "@utils/debug";

// interface

export const $isCheckedSunriseAgree = SunriseDomain.createStore(false);
export const toggleSunriseAgree = SunriseDomain.createEvent();
export const cancelSunriseAgree = SunriseDomain.createEvent();
export const acceptSunriseAgree = SunriseDomain.createEvent();
export const showSunriseAgree = SunriseDomain.createEvent();

// reqeusts

export const $didUserAgreeSunrise = $user.map(({ sunrise_agree }) => sunrise_agree);
export const agreeSunriseTermsFx = SunriseDomain.createEffect<void, AxiosResponse>();

// debug

// $didUserAgreeSunrise.watch((isAgreeSunrise) => logline('[$sunrise/agreement]', { isAgreeSunrise }));