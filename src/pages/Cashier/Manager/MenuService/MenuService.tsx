import { Card, IconButton, Input, Option, Select } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ModalProduct } from '../../../../components/Modal/ModalProduct';
import { ProductItem } from '../../../../components/ProductItem';
import { ICategory, IProduct } from '../../../../models/common';
import { cashierStore } from './../../../../store/store';
import { removeDiacritics } from '../../../../utils/helper';
import clsx from 'clsx';

export interface IMenuServiceProps {}

export function MenuService(props: IMenuServiceProps) {
  const { listCategory, listProduct } = cashierStore();
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>(listProduct);
  const [searchKey, setSearchKey] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    if (listProduct.length > 0) {
      setProducts(listProduct);
    }
  }, [listProduct]);

  const handleOpenModalChooseProduct = (product: IProduct) => {
    setCurrentProduct(product);
    setIsOpenModalProduct(true);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchKey(searchValue);
    const normalizedSearchValue = removeDiacritics(searchValue.toUpperCase());
    setProducts(
      searchValue
        ? listProduct.filter((item) => removeDiacritics(item.title.toUpperCase()).includes(normalizedSearchValue))
        : listProduct
    );
  };

  const handleDeleteSearch = () => {
    setSearchKey('');
    setProducts(listProduct);
  };

  const handleChangeCategory = (value: number) => {
    const list = value !== 0 ? products.filter((item: IProduct) => item.categoryId === value) : products;
    // const normalizedSearchValue = removeDiacritics(searchKey.toUpperCase());
    // const listSearch = normalizedSearchValue
    //   ? listProduct.filter((item) => removeDiacritics(item.title.toUpperCase()).includes(normalizedSearchValue))
    //   : list;
    // setProducts(listSearch);
    setProducts(list);
  };
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="flex h-12 justify-between">
          <div className="flex h-10 items-center">
            <Input
              type="text"
              placeholder="Tìm sản phẩm..."
              className={clsx(
                'ml-6 !w-[240px] !border !border-gray-300 bg-white pl-4 !text-base text-gray-900 shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!w-[320px] focus:shadow-lg',
                searchKey && 'pl-10'
              )}
              labelProps={{
                className: 'hidden ',
              }}
              icon={<i className="fa-solid fa-magnifying-glass absolute  text-gray-500"></i>}
              value={searchKey}
              onChange={handleSearch}
            />
            {searchKey && (
              <IconButton
                onClick={handleDeleteSearch}
                className="!absolute left-4 ml-5 h-8 w-8 rounded-full bg-white shadow-none"
              >
                <i className="fa-solid fa-xmark fa-xl text-red-500"></i>
              </IconButton>
            )}
          </div>
          <div className="w-36 ">
            {listCategory.length > 0 && (
              <Select
                className="!border !border-gray-300 bg-white text-base text-gray-900 shadow-gray-900/5 ring-4 ring-transparent hover:shadow-lg"
                containerProps={{
                  className: '!min-w-0',
                }}
                menuProps={{
                  className: 'text-base',
                }}
                labelProps={{
                  className: 'hidden',
                }}
                value={String(categoryId)}
                onChange={(e) => {
                  handleChangeCategory(Number(e));
                }}
              >
                {listCategory.map((item: ICategory, index: number) => (
                  <Option
                    onClick={() => setCategoryId(item.id)}
                    className="text-black"
                    key={`${item.title} ${index}`}
                    value={String(item.id)}
                  >
                    {item.title}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>
        <Card className="wrapperBoard grid h-full w-full flex-1 grid-cols-4 gap-8 overflow-auto border p-4 shadow-xl">
          {products.map((product: IProduct) => (
            <ProductItem key={product.id} product={product} handleAddToCart={handleOpenModalChooseProduct} />
          ))}
        </Card>
      </div>
      {isOpenModalProduct && currentProduct && (
        <ModalProduct
          isOpen={isOpenModalProduct}
          product={currentProduct}
          handleCloseModal={() => setIsOpenModalProduct(false)}
        />
      )}
    </>
  );
}
