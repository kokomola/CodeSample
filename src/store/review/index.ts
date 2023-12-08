
import { defaultReview, Review } from './types';
import { AppDomain } from '@store/app';

export const $reviewInfo = AppDomain.createStore<Review>(defaultReview);

export const $isAvalableReview = AppDomain.createStore<boolean>(false);

export const checkReview = AppDomain.createEvent();

export const checkAvailableReview = AppDomain.createEvent();
export const checkAvailableReviewFx = AppDomain.createEffect<void, boolean>();

export const askReview = AppDomain.createEvent();

export const readReviewInfoFx = AppDomain.createEffect<void, Review>();
export const storeReviewInfoFx = AppDomain.createEffect<Review, void>();

export const increaseAskings = AppDomain.createEvent();
export const dontAskAnymore = AppDomain.createEvent();

export const showOriginReviewFx = AppDomain.createEffect();

// test

export const testMakeOlderAWeek = AppDomain.createEvent();

export const testEraseReviewStorage = AppDomain.createEvent();