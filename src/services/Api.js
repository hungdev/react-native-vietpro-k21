import { create } from 'apisauce';
import { store } from '../../App';

const api = create({
  baseURL: 'http://hungvu.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  withCredentials: true,
  timeout: 60000,
});

// Add a request interceptor
api.axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
});

// Add a response interceptor
// api.axiosInstance.interceptors.response.use((response) => response, (error) => {
//   // Do something with response error
//   if (error.response.status === 401) {
//     window.alert('Something went wrong!. Please login again');  //eslint-disable-line
//     // window.location.reload();
//     store.dispatch(removeToken());
//     window.location.href = '/#/login';
//   }
//   return Promise.reject(error.response);
// });

export function signUp(params) {
  return api.post(`/signup`, params);
}
export function signIn(params) {
  return api.post(`/login`, params);
}
export function getMe(params) {
  return api.get(`/get-me`, params);
}
// export function getChanel(params) { return api.get(`/channels.list`, params); }
