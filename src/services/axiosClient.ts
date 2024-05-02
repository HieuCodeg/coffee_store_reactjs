import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

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

// axiosClient.interceptors.request.use(
//   function (config: InternalAxiosRequestConfig) {
//     const user = getUserInfo();
//     if (user) {
//       config.headers!["Authorization"] = `Bearer ${user.token}`;
//     }
//     config.headers!["X-localization"] = localStorage.getItem("react-app-lang") || "vi";
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   function (response: AxiosResponse) {
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       window.location.href = "/login";
//       return removeUserInfo();
//     }

//     // if (error.response.status === 404 && !window.location.href.includes("/*")) {
//     //   window.location.href = "/*";
//     // }

//     if (error.response.status === 403 && !window.location.href.includes("/access-denied")) {
//       // axiosClient.get(API.currentUser).then((response) => {
//       //   const user = response?.data?.data;
//       //   saveUserInfo(user);
//       //   window.location.href = "/access-denied";
//       // });
//     }
//     return Promise.reject(error);
//   }
// );
