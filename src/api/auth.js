import http from './http';

export const authSignIn = async obj => {
  const { headers } = await http.post('/auth/sign-in', obj, { withoutToken: true });
  const { 'access-token': accessToken, 'refresh-token': refreshToken } = headers;
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  if (accessToken) localStorage.setItem('accessToken', accessToken);
}

export const authSignUp = obj => http.post('/auth/sign-up', obj, { withoutToken: true });
export const authRecovery = obj => http.post('/auth/recovery', obj, { withoutToken: true });

export const authSignOut = async () => {
  await http.post('/auth/sign-out');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
}

export default {
  authSignIn,
  authSignUp,
  authSignOut,
  authRecovery,
}
