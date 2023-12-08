import { ResponseDone, ResultFail } from '@store/api/types';
import { createGate } from 'effector-react';
import { AddBookmarkFxResponse, Bookmark } from './types';
import { Product } from '@store/shop/types';
import { ShopDomain } from '@store/app';

export const $bookmarks = ShopDomain.createStore<Bookmark[]>([]);

/** Fetch bookmarks */

export const ShopBookmarksGate = createGate();
export const fetchBookmarksFx = ShopDomain.createEffect<
  void,
  ResponseDone<Bookmark[]>,
  ResultFail
>();

/** Add to bookmarks */

export const addBookmark = ShopDomain.createEvent<Product>();
export const addBookmarkFx = ShopDomain.createEffect<
  Product,
  AddBookmarkFxResponse,
  ResultFail
>();

/** Remove from bookmarks */

export const removeBookmark = ShopDomain.createEvent<Product>();
export const removeBookmarkFx = ShopDomain.createEffect<
  Bookmark,
  Bookmark['product_id'],
  ResultFail
>();
