import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICategory, IProduct, ITableItem } from '../models/common';

interface CashierState {
  isMenu: boolean;
  listTable: ITableItem[];
  listCategory: ICategory[];
  listProduct: IProduct[];
  setIsMenu: (value: boolean) => void;
  setListTable: (listTable: ITableItem[]) => void;
  setListCategory: (listCategory: ICategory[]) => void;
  setListProduct: (listProduct: IProduct[]) => void;
}

export const cashierStore = create<CashierState>()(
  persist(
    (set) => ({
      isMenu: false,
      listTable: [],
      listCategory: [],
      listProduct: [],
      setIsMenu: (value: boolean) => set(() => ({ isMenu: value })),
      setListTable: (listTable: ITableItem[]) => set(() => ({ listTable })),
      setListCategory: (listCategory: ICategory[]) => set(() => ({ listCategory })),
      setListProduct: (listProduct: IProduct[]) => set(() => ({ listProduct })),
    }),
    {
      name: 'cashier-storage',
      partialize: (state) => ({ isMenu: state.isMenu }),
    }
  )
);
