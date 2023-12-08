/* eslint-disable camelcase */
import { forward, sample, split } from 'effector';
import i18n from '@utils/i18n';
import { showSuccessFx } from '@store/alert';
import { ResponseDone } from '@store/api/types';
import { focusShopBasketScreen, focusShopListScreen } from '@store/app';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';

import {
  $basket,
  addItem,
  addItemToBasket,
  addItemToBasketRequestFx,
  changeBasket,
  changeQuantityItem,
  changeQuantityItemRequestFx,
  clearBasket,
  clearBasketRequestFx,
  fetchBasketRequestFx,
  removeItemById,
  removeItemFromBasket,
  removeItemFromBasketRequestFx,
} from './index';
import { BasketItem } from './types';

$basket
  .on(changeBasket, (_, data) => data.basket)
  .on(addItem, (basket, item) => {
    const basketWithoutItem = basket.filter((i) => i.id !== item.id);
    return [...basketWithoutItem, item];
  })
  .on(removeItemById, (basket, id) => basket.filter((item) => item.id !== id))
  .on(changeQuantityItem, (basket, { id, quantity }) =>
    basket.map((item) => (item.id === id ? { ...item, quantity } : item))
  );
//.watch((b) => log(`[store/shopBasket] bakset, count = ${b.length}`, b));

forward({
  from: fetchBasketRequestFx.doneData.map((response) => response.data.data),
  to: changeBasket,
});

/*********** fetch basket *********/

forward({
  from: [focusShopBasketScreen, focusShopListScreen],
  to: fetchBasketRequestFx,
});

fetchBasketRequestFx.use(() => {
  const method = 'get';
  const url = endpoints.shop.basket;

  return signedRequest({ method, url });
});

/*********** Add a item to basket ***********/
forward({
  from: addItemToBasketRequestFx.doneData,
  to: [
    addItem,
    showSuccessFx.prepend(({ title }) => {
      return {
        title: '',
        message: `'${title}' ${i18n.t('ShopBasket:successAdded')}`,
      };
    }),
  ],
});

forward({
  from: addItemToBasket,
  to: addItemToBasketRequestFx.prepend(
    ({ product_id, title, quantity = 1, option = null, color = null }) => ({
      title,
      product_id,
      quantity,
      option,
      color,
    })
  ),
});

addItemToBasketRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.shop.basketAdd;

  const { title } = body;
  const { data }: ResponseDone<BasketItem> = await signedRequest({
    method,
    url,
    body,
  });

  return { ...data.data, title };
});

/******** Remove a item from bakset *********/

sample({
  clock: removeItemFromBasket,
  source: $basket,
  fn: (basket, id) => basket.find((item) => item.id === id),
  target: removeItemFromBasketRequestFx,
});

forward({
  from: removeItemFromBasketRequestFx.doneData,
  to: [
    removeItemById.prepend(({ id }) => id),
    showSuccessFx.prepend(({ title }) => {
      return {
        title: '',
        message: `'${title}' ${i18n.t('ShopBasket:successRemoved')}`,
      };
    }),
  ],
});

removeItemFromBasketRequestFx.use(async ({ id, title }) => {
  const method = 'post';
  const url = endpoints.shop.basketRemove;

  await signedRequest({ method, url, body: { id } });

  return { id, title };
});

/*********** Change quantity of a item *********/

split({
  source: changeQuantityItem,
  match: {
    change: ({ quantity }) => quantity > 0,
    remove: ({ quantity }) => quantity <= 0,
  },
  cases: {
    change: changeQuantityItemRequestFx,
    remove: removeItemFromBasket.prepend<{ id: number }>(({ id }) => id),
  },
});

changeQuantityItemRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.shop.basketQuantity;

  return await signedRequest({ method, url, body });
});

/******** Remove all the items ************/

forward({
  from: clearBasket,
  to: clearBasketRequestFx,
});

clearBasketRequestFx.use(() => {
  const method = 'post';
  const url = endpoints.shop.basketRemoveAll;

  return signedRequest({ method, url });
});
