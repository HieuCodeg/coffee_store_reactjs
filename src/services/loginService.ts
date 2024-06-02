import axios from 'axios';
import { UserSubmitForm } from '../pages/Login';
import { API } from '../utils/api';
import { configRequest } from './axiosClient';
import { UserAuth } from '../models/common';

export const loginStandard = async (data: UserSubmitForm) => {
  return axios.post(API.login, data);
};

export const saveUserInfo = (userInfo: UserAuth) => {
  configRequest(userInfo.token);
  return localStorage.setItem('user_info', JSON.stringify(userInfo));
};
export const getUserInfo = () => {
  return JSON.parse(String(localStorage.getItem('user_info')));
};

export const removeUserInfo = () => {
  return localStorage.removeItem('user_info');
};
