import { combine, forward, sample } from 'effector';
import {
  $form,
  $id,
  $name,
  $title,
  $titleInFocus,
  $titleTouched,
  blurTitle,
  changeId,
  changeName,
  changeTitle,
  focusTitle,
  pressSubmitRename,
  renameStableRequest,
  renameStableRequestFx,
  resetForm,
  successRenamedStable,
} from './index';
import { endpoints } from '@constants/endpoints';
import { showSuccess } from '@store/alert';
import i18n from '@utils/i18n';
import {
  closeBottomSheet,
  initBottomSheet,
  resetBottomSheet,
} from '@store/bottomSheet';
import { blurStableScreen, focusStableScreen } from '@store/app';
import { fetchStables } from '@store/stables';
import { signedRequest } from '@utils/agent';

forward({
  from: focusStableScreen,
  to: initBottomSheet,
});

forward({
  from: blurStableScreen,
  to: [resetBottomSheet, closeBottomSheet],
});

$title.on(changeTitle, (_, title) => title).reset(resetForm);
$titleInFocus.on(focusTitle, () => true).reset(blurTitle, resetForm);
$titleTouched.on(blurTitle, () => true).reset(resetForm);

$id.on(changeId, (_, id) => id).reset(resetForm);

$name.on(changeName, (_, name) => name);

sample({
  clock: pressSubmitRename,
  source: $form,
  target: renameStableRequest,
});

/******************* ********************/

forward({
  from: renameStableRequest,
  to: renameStableRequestFx,
});

renameStableRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.stable.rename;

  return signedRequest({ method, url, body });
});

forward({
  from: renameStableRequestFx.done,
  to: successRenamedStable,
});

sample({
  clock: successRenamedStable,
  source: $title,
  target: [changeName, fetchStables],
});

forward({
  from: successRenamedStable,
  to: [
    closeBottomSheet,
    showSuccess.prepend(() => ({
      title: i18n.t(`Stable:successTitleRename`),
      message: i18n.t(`Stable:successTextRename`),
      buttons: [{ text: 'OK' }],
    })),
  ],
});
