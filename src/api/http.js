import axios from 'axios';
import store from '@/store';

const baseURL = process.env.VUE_APP_BASE_URL;

const http = axios.create({ baseURL });

// При протухшем Access token получаем Refresh и Access
const apiToken = async () => {
  const token = localStorage.getItem('refreshToken');
  if (!token) return false;
  const headers = { headers: { Authorization: token } };
  const { headers: resHeaders } = await axios.post(`${baseURL}auth/token`, headers);
  const { 'access-token': accessToken, 'refresh-token': refreshToken } = resHeaders;
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  if (accessToken) localStorage.getItem('accessToken', accessToken);
  return accessToken;
};

// Перед запросом проверяем Access token, и при неуспешной проверке
// пробуем получить новые
const requestUse = async config => {
  if (config.withoutToken) return config;

  const accessTokenStorage = localStorage.getItem('accessToken');
  if (accessTokenStorage) {
    config.headers.Authorization = accessTokenStorage;
    return config;
  }

  const accessTokenApi = await apiToken();
  if (accessTokenApi) return Promise.reject(new Error('REFRESH_TOKEN_INVALID'));
  config.headers.Authorization = accessTokenApi;
  return config;
};

// -----------------------------------------------------------------

const requestError = async error => Promise.reject(error);

// -----------------------------------------------------------------

const responseUse = response => response;

// -----------------------------------------------------------------

// Ошибка запроса
const responseError = async error => {
  const { message, config } = error;
  let code;
  const data = {};

  switch (message) {
    case 'Network Error':
      code = 'NETWORK';
      data.url = error.config.url;
      data.method = error.config.method.toUpperCase();
      break;

    case 'REFRESH_TOKEN_INVALID':
      code = message;
      break;

    default: {
      const { status, config: resConfig, data: dataResponse } = error.response;
      if (status === 400) {
        code = dataResponse;
      } else {
        code = 'HTTP';
        data.statusCode = status;
        data.url = resConfig.url;
        data.method = resConfig.method.toUpperCase();
        data.message = dataResponse;
      }
    }
  }

  if (code === 'ACCESS_TOKEN_INVALID' && config.retryAccessToken
  || code === 'REFRESH_TOKEN_INVALID'
  || code === 'FAIL_AUTH'
  ) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  } else if (code === 'ACCESS_TOKEN_INVALID') {
    localStorage.removeItem('accessToken');
    config.retryAccessToken = true;
    return http(config);
  }

  // if (code === )
  store.commit('errors/add', { code, data });
  return Promise.reject(new Error(code));
};

http.interceptors.request.use(requestUse, requestError);
http.interceptors.response.use(responseUse, responseError);

export default http;
