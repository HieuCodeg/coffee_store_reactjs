import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getUserInfo, removeUserInfo } from './loginService';

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const configRequest = (token: string) => {
  axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      config.headers!['Authorization'] = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const user = getUserInfo();
    if (user) {
      config.headers!["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = "/login";
      return removeUserInfo();
    }
    return Promise.reject(error);
  }
);
