import { forward } from 'effector';
import { showSuccess } from '@store/alert';
//import { blurGlobalPassBioScreen } from '@store/app';
import { Domains } from '@store/app/constants';
import { setOperation } from '@store/securityService';
import { SecurityOperation } from '@store/securityService/types';
import { finishFaceCheck, showSuccessMessageFx } from './index';
import { redirectToScreenFx } from '@store/redirect/index';
import { routes } from 'src/navigator/routes';

showSuccessMessageFx.use(() => {
  console.log('console');
  setTimeout(
    () =>
      showSuccess({
        domain: Domains.Withdraw,
        title: 'screenTitle',
        message: 'titlePendingFaceauthWithdraw',
      }),
    3000,
  );
});

forward({
  from: [finishFaceCheck],
  to: [
    setOperation.prepend(() => SecurityOperation.None),
    redirectToScreenFx.prepend(() => ({ screen: routes.tabs.AmirWallet })),
    showSuccessMessageFx,
  ],
});
