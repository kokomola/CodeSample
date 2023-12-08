import { combine } from 'effector';
import BottomSheet from '@gorhom/bottom-sheet';
import { AppDomain } from '@store/app';

/********** Verification *********/

type BottomSheetRef = React.RefObject<BottomSheet>;

export const initVerifyBottomSheet = AppDomain.createEvent<void>();

export const $verifyEndpoint = AppDomain.createStore<string>('');
export const changeVerifyEndpoint = AppDomain.createEvent<string>();

export const resetVerifyCode = AppDomain.createEvent<void>();

export const $verifyRequestDomain = AppDomain.createStore<string>(
  'VerificationCode'
);
export const changeVerifyRequestDomain = AppDomain.createEvent<string>();

export const $verifyRedirectScreen = AppDomain.createStore<string | null>(null);
export const changeVerifyRedirectScreen = AppDomain.createEvent<
  string | null
>();

export const $verifyBottomSheetRef = AppDomain.createStore<BottomSheetRef>({
  current: null,
});

export const openVerifyBottomSheet = AppDomain.createEvent<void>();
export const openVerifyBottomSheetFx = AppDomain.createEffect<
  React.RefObject<BottomSheet>,
  void
>();
export const closeVerifyBottomSheet = AppDomain.createEvent<void>();
export const closeVerifyBottomSheetFx = AppDomain.createEffect<
  React.RefObject<BottomSheet>,
  void
>();

export const $verifyCode = AppDomain.createStore<string>('');
export const $verifyCodeInFocus = AppDomain.createStore<boolean>(false);
export const $verifyCodeTouched = AppDomain.createStore<boolean>(false);
export const changeVerifyCode = AppDomain.createEvent<string>();
export const focusVerifyCode = AppDomain.createEvent<React.SyntheticEvent>();
export const blurVerifyCode = AppDomain.createEvent<React.SyntheticEvent>();

export const $verifyPayload = combine($verifyCode, (code) => ({ code }));

export const $verifyMethod = AppDomain.createStore<string>('post');
export const changeVerifyMethod = AppDomain.createEvent<string>();

export const $verifyCodeErrors = combine(
  {
    required: combine($verifyCode, (verifyCode) => {
      return verifyCode.length === 0
        ? 'SecurityServiceTwoFaBottomSheet:verifyCodeIsRequired'
        : null;
    }),
  },
  ({ required }) => [required].filter(Boolean)
);

export const $isVerifyFormValid = combine(
  [$verifyCodeErrors],
  (errors) => !errors.flat().length
);

export const pressSubmitVerifyCode = AppDomain.createEvent<
  React.SyntheticEvent
>();

// Belongs to AppDomain
export const verifyRequest = AppDomain.createEvent<any>();
export const verifyRequestFx = AppDomain.createEffect<any, any>();
export const successVerifyCode = AppDomain.createEvent();
