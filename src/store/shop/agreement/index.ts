import { AxiosResponse } from "axios";
import { ShopDomain } from "@store/app";
import { $user } from "@store/user";
import { logline } from "@utils/debug";

// interface

export const $isCheckedShopAgree = ShopDomain.createStore(false);
export const toggleShopAgree = ShopDomain.createEvent();
export const cancelShopAgree = ShopDomain.createEvent();
export const acceptShopAgree = ShopDomain.createEvent();
export const showShopAgree = ShopDomain.createEvent();

// reqeusts

export const $didUserAgreeShop = $user.map(({ shop_agree }) => shop_agree);
export const agreeShopTermsFx = ShopDomain.createEffect<void, AxiosResponse>();

// debug

//$didUserAgreeShop.watch((isAgreeShop) => logline('[$shop/agreement]', { isAgreeShop }));
