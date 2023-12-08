import { createEffect, createEvent, createStore } from 'effector';
import { ScrollViewRef } from './types';

export const $scrollViewRef = createStore<ScrollViewRef | null>(null);

export const initScrollViewRef = createEvent<void>();
export const resetScrollViewRef = createEvent<void>();

export const scrollToBottomFx = createEffect<ScrollViewRef | null, void>();
