import { AxiosResponse } from 'axios';
import { ICategory, IProduct, ISizeDetails, ITableItem } from '../models/common';
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
    data.unshift({ id: 0, title: 'Tất cả' });
    return data;
  } catch (error) {
    throw new Error('Lỗi khi tải dữ liệu Danh mục');
  }
};

export const getListProduct = async (): Promise<IProduct[]> => {
  try {
    const response: AxiosResponse<IProduct[]> = await axiosClient.get<IProduct[]>(API.getListProduct);
    const data = response.data;
    data.forEach((item: IProduct) => {
      if (Object.keys(item.sizes).length > 1) {
        const sortedKey = Object.keys(item.sizes).sort().reverse();

        const sortedSizes: Record<string, ISizeDetails> = {};
        sortedKey.forEach((key) => {
          sortedSizes[key] = item.sizes[key];
        });
        item.sizes = sortedSizes;
      }
    });
    return data;
  } catch (error) {
    throw new Error('Lỗi khi tải dữ liệu sản phẩm');
  }
};
