import { endpoints } from '@constants/endpoints';
import { showSuccess } from '@store/alert';
import { referralLinkGate } from '@store/referralSystem';
import { signedRequest } from '@utils/agent';
import i18n from '@utils/i18n';
import { forward, sample } from 'effector';
import {
  $addReferralPayload,
  $email,
  $emailInFocus,
  $emailTouched,
  $partnerName,
  $partnerNameInFocus,
  $partnerNameTouched,
  $referralData,
  addReferralEmailFx,
  blurEmail,
  blurPartnerName,
  focusEmail,
  focusPartnerName,
  onChangeEmail,
  onChangePartnerName,
  pressSubmit,
} from './index';
import { fetchReferralFx } from './index';
import {
  REFERRAL_LINKS_HOST_NEW as referralHostNew,
  REFERRAL_LINKS_HOST_OLD as referralHostOld,
} from 'src/config';
import { logline } from '@utils/debug';

$referralData.on(fetchReferralFx.doneData, (_, response) => {
  const referralData = response.data.data;
  return {
    ...referralData,
    refferal_link: referralData?.refferal_link?.replace(
      referralHostOld,
      referralHostNew
    ),
  };
});

forward({
  from: referralLinkGate.open,
  to: fetchReferralFx,
});

/** referral data */

fetchReferralFx.use(() => {
  const method = 'get';
  const url = endpoints.sunrise.referralData;

  return signedRequest({ method, url });
});

/**  partner link invitation (XHR): email input */

$email
  .on(onChangeEmail, (_, amount) => amount)
  .reset([referralLinkGate.close, addReferralEmailFx.doneData]);

$emailInFocus
  .on(focusEmail, () => true)
  .reset(blurEmail, referralLinkGate.close, addReferralEmailFx.doneData);
$emailTouched
  .on(blurEmail, () => true)
  .reset(referralLinkGate.close, addReferralEmailFx.doneData);

// sunrise partner link invitation (XHR): partner's name input

$partnerName
  .on(onChangePartnerName, (_, amount) => amount)
  .reset(referralLinkGate.close, addReferralEmailFx.doneData);

$partnerNameInFocus
  .on(focusPartnerName, () => true)
  .reset(blurPartnerName, referralLinkGate.close, addReferralEmailFx.doneData);
$partnerNameTouched
  .on(blurPartnerName, () => true)
  .reset(referralLinkGate.close, addReferralEmailFx.doneData);

// sunrise partner link invitation (XHR)

sample({
  clock: pressSubmit,
  source: $addReferralPayload,
  target: addReferralEmailFx,
});

addReferralEmailFx.use((body) => {
  logline('addReferal');
  const method = 'post';
  const url = endpoints.sunrise.addReferralByEmail;
  logline('', { method, url, body });
  return signedRequest({ method, url, body });
});

forward({
  from: addReferralEmailFx.done,
  to: [
    showSuccess.prepend(() => ({
      title: i18n.t('SunriseStore:addReferralTitleSuccess'),
      message: i18n.t('SunriseStore:addReferralMessageSuccess'),
    })),
  ],
});
