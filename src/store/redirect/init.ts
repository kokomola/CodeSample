import { redirectToBackOrScreenFx, redirectToScreenFx } from './index';
import * as Navigate from '../../navigator/RootNavigation';
import { logline } from '@utils/debug';

redirectToScreenFx.use(async ({ rootNav, screen, params }) => {
  console.log({ rootNav, screen });
  if (screen) {
    if (screen === 'goBack' && Navigate.canGoBack()) {
      //logline('[@redirectToScreenFx] to screen, goBack', screen);
      Navigate.goBack();
    }
    if (rootNav) {
      Navigate.navigate(rootNav, { screen, params });
    }
    if (screen !== 'goBack') {
      //logline('[@redirectToScreenFx] to screen, resetRoot', screen);
      Navigate.navigate(screen);
      //Navigate.resetRoot(screen);
    }
  }
});

redirectToBackOrScreenFx.use(async ({ rootNav, screen, params }) => {
  if (screen === 'goBack' && Navigate.canGoBack()) {
    Navigate.goBack();
  } else if (rootNav && screen) {
    Navigate.navigate(rootNav, { screen, params });
  } else if (screen !== 'goBack' && screen) {
    // logline('[@store/verify] to screen', screen);
    Navigate.resetRoot(screen);
  }
});
