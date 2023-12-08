import { closeBS, initChildBS, openBS } from './../../bottomSheetCommon/index';
import { endpoints } from "@constants/endpoints";
import { AppGate, focusSunriseProgramScreen } from "@store/app";
import { signedRequest } from "@utils/agent";
import { forward, guard } from "effector";
import { $didUserAgreeSunrise, $isCheckedSunriseAgree, acceptSunriseAgree, agreeSunriseTermsFx, cancelSunriseAgree, showSunriseAgree, toggleSunriseAgree } from "./index";
import { setTimeoutFx } from '@store/app/timeout';

/* forward({
	from: agreeTerms,
	to: agreeSunriseTermsFx,
}); */

// interface

$isCheckedSunriseAgree.on(toggleSunriseAgree, (isAgreed) => !isAgreed);

guard({
	clock: [focusSunriseProgramScreen],
	source: $didUserAgreeSunrise,
	filter: (didUserAgree) => !didUserAgree,
	target: [
		initChildBS.prepend(() => ({
			fcKey: 'SunriseAgreement',
			height: 300,
		})),
		setTimeoutFx.prepend(() => ({ fn: showSunriseAgree })),
	]
});

forward({
	from: [cancelSunriseAgree, agreeSunriseTermsFx.done],
	to: closeBS,
})

guard({
	clock: showSunriseAgree,
	source: $didUserAgreeSunrise,
	filter: (didUserAgree) => !didUserAgree,
	target: openBS.prepend(() => 'SunriseAgreement'),
});

// requests

forward({
	from: acceptSunriseAgree,
	to: agreeSunriseTermsFx,
})

agreeSunriseTermsFx.use(() => {
	const method = 'post';
	const url = endpoints.sunrise.agreeSunrise;
	const body = { sunrise_agree: true };

	return signedRequest({ method, url, body });
});