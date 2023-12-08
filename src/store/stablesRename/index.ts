import React from 'react';
import { combine } from 'effector';
import { ResultFail, ResponseDone } from '@store/api/types';
import { StableDomain } from '@store/app';

export const pressSubmitRename = StableDomain.createEvent<
  React.SyntheticEvent
>();

//const $isBottomSheetFormRef = $bottomSheetFormRef.map((ref) => !!ref?.current);

export const $title = StableDomain.createStore('');
export const $titleInFocus = StableDomain.createStore(false);
export const $titleTouched = StableDomain.createStore(false);
export const focusTitle = StableDomain.createEvent<React.SyntheticEvent>();
export const blurTitle = StableDomain.createEvent<React.SyntheticEvent>();
export const changeTitle = StableDomain.createEvent<string>();

export const $id = StableDomain.createStore<string>('');
export const changeId = StableDomain.createEvent<string>();

export const $name = StableDomain.createStore<string>('');
export const changeName = StableDomain.createEvent<string>();

export const resetForm = StableDomain.createEvent<void>();

export const renameStable = StableDomain.createEvent<void>();

export const successRenamedStable = StableDomain.createEvent<void>();

export const renameStableRequest = StableDomain.createEvent<{
  id: string;
  title: string;
}>();
export const renameStableRequestFx = StableDomain.createEffect<
  { id: string; title: string },
  ResponseDone,
  ResultFail
>();

export const $form = combine({
  id: $id,
  title: $title,
});

// Errors

export const $idErrors = combine(
  {
    minLen: $id.map((name) => (!name.length ? 'Stable:enterTitle' : null)),
  },
  ({ minLen }) => [minLen].filter(Boolean)
);

export const $titleErrors = combine(
  {
    minLen: $title.map((name) => (!name.length ? 'Stable:enterTitle' : null)),
    maxLen: $title.map((name) =>
      name.length > 30 ? 'Stable:maxLengthNameError' : null
    ),
  },
  ({ minLen, maxLen }) => [minLen, maxLen].filter(Boolean)
);

export const $isFormValid = combine(
  [$idErrors, $titleErrors],
  (errors) => !errors.flat().length
);

//$form.watch((body) => console.log('$body = ', body));
