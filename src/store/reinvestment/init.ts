import { forward, sample } from 'effector';
import {
  $savingBtc,
  $savingEth,
  $savingUsdt,
  changeSavingBtc,
  changeSavingEth,
  changeSavingUsdt,
  $stable,
  changeStable,
  $partner,
  changePartner,
  $form,
  save,
  updateReinvestmentFx,
} from '@store/reinvestment/index';
import { $user } from '@store/user';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { showSuccess } from '@store/alert';

$savingBtc.on(changeSavingBtc, (_, savingBtc) => savingBtc);
$savingEth.on(changeSavingEth, (_, savingEth) => savingEth);
$savingUsdt.on(changeSavingUsdt, (_, savingUsdt) => savingUsdt);
$stable.on(changeStable, (_, stable) => stable);
$partner.on(changePartner, (_, partner) => partner);
updateReinvestmentFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.reinvest;
  return signedRequest({ method, url, body });
});
sample({
  source: $form,
  fn: (body) => body,
  clock: save,
  target: updateReinvestmentFx,
});

forward({
  from: updateReinvestmentFx.done,
  to: showSuccess.prepend(() => ({
    domain: 'UI',
    title: 'successSavedTitle',
    message: 'successSavedText',
  })),
})

sample({
  source: $user,
  fn: (user) => {
    const { savings } = user.reinvestment;
    return typeof savings === 'number'
      ? savings
      : user.reinvestment.savings.btc;
  },
  clock: $user.updates,
  target: $savingBtc,
});

sample({
  source: $user,
  fn: (user) => {
    const { savings } = user.reinvestment;
    return typeof savings === 'number'
      ? savings
      : user.reinvestment.savings.eth;
  },
  clock: $user.updates,
  target: $savingEth,
});

sample({
  source: $user,
  fn: (user) => {
    const { savings } = user.reinvestment;
    return typeof savings === 'number'
      ? savings
      : user.reinvestment.savings.usdt;
  },
  clock: $user.updates,
  target: $savingUsdt,
});

sample({
  source: $user,
  fn: (user) => user.reinvestment.partner,
  clock: $user.updates,
  target: $partner,
});

sample({
  source: $user,
  fn: (user) => user.reinvestment.stable,
  clock: $user.updates,
  target: $stable,
});
