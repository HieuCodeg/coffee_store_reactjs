import { AxiosResponse } from 'axios';
import { ICategory, IProduct, ITableItem } from '../models/common';
import { API } from '../utils/api';
import { axiosClient } from './axiosClient';

export const getListTable = async (): Promise<ITableItem[]> => {
  try {
    const response: AxiosResponse<ITableItem[]> = await axiosClient.get<ITableItem[]>(API.getListTable);
    return response.data;
  } catch (error) {
    throw new Error('Lỗi khi tải dữ liệu bàn');
  }
};

export const getListCategory = async (): Promise<ICategory[]> => {
  try {
    const response: AxiosResponse<ICategory[]> = await axiosClient.get<ICategory[]>(API.getListCategory);
    const data = response.data;
    data.unshift({ title: 'Tất cả', id: 0 });
    return data;
  } catch (error) {
    throw new Error('Lỗi khi tải dữ liệu Danh mục');
  }
};

export const getListProduct = async (): Promise<IProduct[]> => {
  try {
    const response: AxiosResponse<IProduct[]> = await axiosClient.get<IProduct[]>(API.getListProduct);
    return response.data;
  } catch (error) {
    throw new Error('Lỗi khi tải dữ liệu sản phẩm');
  }
};
