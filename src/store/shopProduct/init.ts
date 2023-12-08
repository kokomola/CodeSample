import { $products } from '@store/shop';
import { guard, sample, combine, forward } from 'effector';
import {
  $selectedColorId,
  $selectedOptionId,
  $selectedProduct,
  changeProduct,
  selectColorId,
  selectOptionId,
  SelectedPayload,
  selectProduct,
  $featured,
  createFeaturedListFx,
  $scrollViewRef,
  scrollToTopFx,
  checkImgsFx,
  $validImgs,
  $images,
} from './index';


import { $basket } from '@store/shopBasket';
import { blurShopProductScreen, redirectToShopNavFx } from '@store/app';
import { CreateFeaturedListPayload } from '@store/shop/types';
import { addBookmarkFx, removeBookmarkFx } from '@store/shopFavourites';
import { routes } from 'src/navigator/routes';
import { log, logline } from '@utils/debug';
import { checkImageURL } from '@utils/imgUtil';

$selectedProduct
  .on(changeProduct, (_, product) => product)
  .reset(blurShopProductScreen);

$selectedColorId
  .on(selectColorId, (_, colorId) => colorId)
  .reset(blurShopProductScreen);

$selectedOptionId
  .on(selectOptionId, (_, optionId) => optionId)
  .reset(blurShopProductScreen);

/** Add and remove bookmarks */
$selectedProduct.on(addBookmarkFx.doneData, (state, { product }) => {
  return state !== null
    ? { ...state, bookmark: product.id === state.id ? true : state.bookmark }
    : null;
});

$selectedProduct.on(removeBookmarkFx.doneData, (state, id) => {
  return state !== null
    ? { ...state, bookmark: state.id === id ? false : state.bookmark }
    : null;
});

$validImgs.on(checkImgsFx.doneData, (_, validImgs) => validImgs).reset(blurShopProductScreen);

$featured.on(createFeaturedListFx.doneData, (_, payload) => payload);

export const $isAdded = combine(
  $basket,
  $selectedProduct.map((p) => {
    if (!p) return;
    return {
      id: p.id,
      colorId: p?.colors[0]?.id || null,
      optionId: p?.options[0]?.id || null,
    };
  }),
  $selectedColorId,
  $selectedOptionId,
  (basket, chosenProduct, chosenColorId, chosenOptionId) => {
    if (chosenProduct) {
      const cp = chosenProduct;
      const isFirstColor = cp.colorId && chosenColorId === cp.colorId;
      const isFirstOption = cp.optionId && chosenOptionId === cp.optionId;
      const productWithoutOptions = isFirstColor && isFirstOption;

      return basket.some((item) => {
        const basketWithoutOptions = !item?.color && !item?.option;
        const isEqualOptions =
          item.color === chosenColorId && item.option === chosenOptionId;
        return (
          item.product_id === cp.id &&
          (isEqualOptions || (productWithoutOptions && basketWithoutOptions))
        );
      });
    }
    return null;
  }
);

const wasSelectedProduct = sample({
  clock: selectProduct,
  source: $products,
  fn: (products, { id, colorId, optionId }) => {
    const product = products.find((p) => p.id === id);
    return {
      product,
      colorId: colorId || product?.colors[0]?.id,
      optionId: optionId || product?.options[0]?.id,
    };
  },
});

forward({
  from: wasSelectedProduct,
  to: [
    changeProduct.prepend(({ product }: SelectedPayload) => product || null),
    selectColorId.prepend(({ colorId }: SelectedPayload) => colorId || null),
    selectOptionId.prepend(({ optionId }: SelectedPayload) => optionId || null),
  ],
});

guard({
  clock: wasSelectedProduct,
  filter: ({ product }) => !!product,
  target: redirectToShopNavFx.prepend(() => ({ screen: routes.shopNav.ShopProduct })),
});

sample({
  clock: changeProduct,
  source: $scrollViewRef,
  target: scrollToTopFx,
});

scrollToTopFx.use((ref) => {
  setTimeout(
    () =>
      ref?.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      }),
    1000
  );
});

/** Featured products */
sample({
  clock: $selectedProduct.updates,
  source: $products,
  fn: (products, chosenProduct): CreateFeaturedListPayload => ({
    products,
    chosenProduct,
  }),
  target: createFeaturedListFx,
});

createFeaturedListFx.use(({ products, chosenProduct }) => {
  if (chosenProduct) {
    const productsByRecommendation = products
      .filter((item) => item.id !== chosenProduct.id)
      .filter((item) =>
        item.categories
          .map((c) => c.category_id.toString())
          .includes(chosenProduct.recommended_category)
      )
      .slice(0, 3);

    const productsByCategory = products
      .filter((item) => item.id !== chosenProduct.id)
      .filter((item) => item.categories.map((c) => c.category_id.toString()))
      .slice(0, 3);

    if (productsByRecommendation.length) {
      return productsByRecommendation;
    }
    return productsByCategory;
  }
  return [];
});

forward({
  from: $images,
  to: checkImgsFx,
})

checkImgsFx.use(async (imgs) => {
  const validImgs = [];
  for (const img of imgs) {
    const isValidImg = await checkImageURL(img);
    if (isValidImg) validImgs.push(img);
  }
  return validImgs;
})

// debug


/* $selectedProduct.watch((p) =>
  logline('[SelectedProduct]', { id: p?.id, title: p?.title, isNull: !p })
);

$images.watch(images => log('shopProduct/$store/images', images))
$validImgs.watch((validImgs) => logline('[]', { validImgs }));

$selectedProduct.watch(product => log('[shopProduct/$store]', product)) */