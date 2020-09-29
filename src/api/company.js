import http from './http';

export const apiGetCompany = async() => (await http.get('/company')).data;

export default {
  apiGetCompany
}
