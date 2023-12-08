import { endpoints } from '@constants/endpoints';
import {
  signUpRequestFx,
  signUpRequest,
  signInRequest,
  signInRequestFx,
} from '@store/api/index';
import { forward } from 'effector';
import { signedRequest } from '@utils/agent';
forward({
  from: signUpRequest,
  to: signUpRequestFx,
});

signUpRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.register;

  return signedRequest({ method, url, body });
});

forward({
  from: signInRequest,
  to: signInRequestFx,
});

signInRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.login;
  const headers = { ReCaptchaVersion: '3' };

  return signedRequest({ method, url, body, headers });
});
