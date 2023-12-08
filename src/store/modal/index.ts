import { AppDomain } from "@store/app";

export const $isOpenned = AppDomain.createStore<boolean>(false);

export const openModal = AppDomain.createEvent<{ modalType: string, modalProps: string }>();

export const closeModal = AppDomain.createEvent();