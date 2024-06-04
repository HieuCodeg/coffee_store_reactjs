import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { ICategory, IProduct, ITableItem } from '../../models/common';
import { getListCategory, getListProduct, getListTable } from '../../services/cashierService';
import { cashierStore } from '../../store/store';
import { Manager } from './Manager';
import { Order } from './Order';

export function Cashier() {
  const { setListCategory, setListProduct, setListTable } = cashierStore();
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: getListProduct,
  });

  const {
    data: tables,
    isLoading: isLoadingTables,
    error: errorTables,
  } = useQuery<ITableItem[], Error>({
    queryKey: ['tables'],
    queryFn: getListTable,
  });
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: getListCategory,
  });

  const isLoading = isLoadingProducts || isLoadingCategories || isLoadingTables;
  const isError = errorProducts || errorCategories || errorTables;

  useEffect(() => {
    if (tables) {
      setListTable(tables);
    }
    if (products) {
      setListProduct(products);
    }
    if (categories) {
      setListCategory(categories);
    }
  }, [products, categories, tables, setListTable, setListProduct, setListCategory]);

  useEffect(() => {
    if (isError) {
      toast.error(isError?.message);
    }
  }, [isError]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex h-full w-full gap-4 pl-4 pr-4 pt-1">
        <div className="h-full w-3/5 overflow-hidden">
          <Manager />
        </div>
        <div className="w-2/5">
          <Order />
        </div>
      </div>
    </>
  );
}
