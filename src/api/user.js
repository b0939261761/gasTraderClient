import http from './http';

export const apiGetUser = async() => (await http.get('/user')).data;
export const apiChangePassword = params => http.post('/user/change-password', params);

export default {
  apiGetUser,
  apiChangePassword
}
