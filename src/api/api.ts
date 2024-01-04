import axios from 'axios';
import {getItem, setItem} from '../utils';
import * as Keychain from 'react-native-keychain';
import apiConfig from '../config/apiConfig';
//
const api = axios.create({
  baseURL: apiConfig.SERVER_LIVE,
});
//
api.interceptors.request.use(
  async config => {
    const value = await Keychain.getGenericPassword();
    if (value) {
      const jwt = JSON.parse(value.password);
      config.headers.Authorization = `${jwt.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);
//
api.interceptors.response.use(
  async response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const value = await Keychain.getGenericPassword();
        if (value) {
          const jwt = JSON.parse(value.password);
          const refreshToken = jwt.refreshToken;
          console.log('refreshToken', refreshToken);
          const resp = await axios.post(
            `${apiConfig.SERVER_LIVE}/auth/refreshToken`,
            {
              refreshToken,
            },
          );
          const {accessToken} = resp.data;
          console.log('accessToken:::', accessToken);
          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              accessToken: accessToken,
              refreshToken: refreshToken,
            }),
          );
          originalRequest.headers.Authorization = `${accessToken}`;
        }
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error
      }
    }

    return Promise.reject(error);
  },
);
export default api;
