import { focusShopCheckoutScreen, focusShopProductScreen } from '@store/app/index';
import { forward, guard } from "effector";

import { $didUserAgreeShop } from '@store/shop/agreement';
import { endpoints } from "@constants/endpoints";
import { closeBS, initAndOpenBSFx, openBS } from '@store/bottomSheetCommon/index';
import { focusShopBasketScreen, focusShopListScreen } from "@store/app";
import { signedRequest } from "@utils/agent";
import { $isCheckedShopAgree, acceptShopAgree, agreeShopTermsFx, cancelShopAgree, showShopAgree, toggleShopAgree } from "./index";


// interface

$isCheckedShopAgree.on(toggleShopAgree, (isAgreed) => !isAgreed);

guard({
	clock: [focusShopBasketScreen, focusShopListScreen, focusShopProductScreen, focusShopCheckoutScreen],
	source: $didUserAgreeShop,
	filter: (didUserAgree) => !didUserAgree,
	target: initAndOpenBSFx.prepend(() => ({
		fcKey: 'ShopAgreement',
		height: 240,
		fn: showShopAgree
	}))
	/* target: [
		initChildBS.prepend(() => ({
			fcKey: 'ShopAgreement',
			height: 240,
		})),
		setTimeoutFx.prepend(() => ({ fn: showShopAgree }))
	] */
});

forward({
	from: [cancelShopAgree, agreeShopTermsFx.done],
	to: closeBS,
});

guard({
	clock: showShopAgree,
	source: $didUserAgreeShop,
	filter: (didUserAgree) => !didUserAgree,
	target: openBS.prepend(() => 'ShopAgreement'),
})

// requests

forward({
	from: acceptShopAgree,
	to: agreeShopTermsFx,
})

agreeShopTermsFx.use(() => {
	const method = 'post';
	const url = endpoints.shop.agreeTerms;
	const body = { shop_agree: true };

	return signedRequest({ method, url, body });
})