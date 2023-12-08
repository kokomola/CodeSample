/* eslint-disable camelcase */
import { forward, sample } from 'effector';
import {
  $bookmarks,
  addBookmark,
  addBookmarkFx,
  fetchBookmarksFx,
  removeBookmark,
  removeBookmarkFx,
  ShopBookmarksGate,
} from './index';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';

$bookmarks.on(fetchBookmarksFx.doneData, (_, response) => response.data.data);
$bookmarks.on(removeBookmarkFx.doneData, (state, id) =>
  state.filter((bookmark) => bookmark.product_id !== id)
);
$bookmarks.on(addBookmarkFx.doneData, (state, bookmark) => [
  ...state,
  {
    ...bookmark,
    product: {
      ...bookmark.product,
      bookmark: true,
    },
  },
]);

/** fetch bookmarks */

forward({
  from: ShopBookmarksGate.open,
  to: fetchBookmarksFx,
});

fetchBookmarksFx.use(async () => {
  const method = 'get';
  const url = endpoints.shop.bookmarks;
  return await signedRequest({ method, url });
});

/** add bookmarks */

forward({
  from: addBookmark,
  to: addBookmarkFx,
});

addBookmarkFx.use(async (product) => {
  const method = 'post';
  const url = endpoints.shop.addBookmark;
  const body = {
    product_id: product.id,
  };

  const { data } = await signedRequest({
    method,
    url,
    body,
  });

  const result = { ...data.data, product };

  return result;
});

/** remove bookmarks */

sample({
  source: $bookmarks,
  clock: removeBookmark,
  fn: (bookmarks, product) =>
    bookmarks.find((bookmark) => bookmark.product_id === product.id),
  target: removeBookmarkFx,
});

removeBookmarkFx.use(async (removedProduct) => {
  const method = 'post';
  const url = endpoints.shop.removeBookmark;

  await signedRequest({
    method,
    url,
    body: { id: removedProduct.id },
  });

  return removedProduct.product_id;
});
