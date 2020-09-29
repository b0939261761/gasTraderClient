import http from './http';

export const apiGetUser = async() => (await http.get('/user')).data;

export default {
  apiGetUser
}
