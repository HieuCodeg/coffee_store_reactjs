import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import * as React from 'react';
import { cashierStore } from './../../../../store/store';
import { ICategory, IProduct, ISizeDetails } from '../../../../models/common';
import { ProductItem } from '../../../../components/ProductItem';
import App from './../../../../App';
import { useState } from 'react';
import { formatCurrencyToVND } from '../../../../utils/helper';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface IMenuServiceProps {}

export function MenuService(props: IMenuServiceProps) {
  const { listCategory, listProduct } = cashierStore();
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>({
    id: 6,
    title: 'Trà sữa sô-cô-la',
    description: 'Frizi sô-cô-la kem ngon mát lạnh',
    sizes: {
      S: {
        name: 'S',
        price: '25000',
      },
      L: {
        name: 'L',
        price: '65000',
      },
      M: {
        name: 'M',
        price: '50000',
      },
    },
    categoryId: 2,
    photo:
      'https://res.cloudinary.com/dgumku9xc/image/upload/v1717238467/product_images/82d03b88-d26a-4cdf-a7e3-dfc95b17af3a.jpg',
  });
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="flex h-12 justify-between">
          <div className="flex h-10 items-center">
            <Input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="ml-6 !w-[240px] !border !border-gray-300 bg-white pl-8 !text-base text-gray-900 shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!w-[320px] focus:shadow-lg"
              labelProps={{
                className: 'hidden ',
              }}
              icon={
                <IconButton className="!absolute h-8 w-8 rounded-full bg-white shadow-none">
                  <i className="fa-solid fa-xmark fa-xl text-red-500"></i>
                </IconButton>
              }
              // value={''}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 ml-6 text-gray-500"></i>
          </div>
          <div className="w-36 ">
            <Select
              label="Select Version"
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
            >
              {listCategory.map((item: ICategory, index: number) => (
                <Option className="text-black" key={`${item.title} ${index}`} value={String(item.id)}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Card className="wrapperBoard grid h-full w-full flex-1 grid-cols-4 gap-8 overflow-auto border p-4 shadow-xl">
          {listProduct.map((product: IProduct) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Card>
      </div>
      <Dialog open={true} size="lg">
        <DialogHeader>
          <IconButton className="!absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white ">
            <i className="fa-solid fa-xmark fa-xl text-black"></i>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <div className="flex gap-6">
            <div className="w-2/5">
              <Typography className="text-lg font-bold uppercase text-[#53382c]">{currentProduct?.title}</Typography>
              <div className="relative pt-[100%]">
                <img
                  className="absolute top-0 h-full w-full object-cover"
                  src={currentProduct?.photo}
                  alt={currentProduct?.title}
                />
              </div>
              <div className="flex justify-center gap-2">
                <Typography className="text-[#333333]">TỔNG CỘNG:</Typography>

                <Typography className="font-bold text-[#b22830]">{formatCurrencyToVND(100000)}</Typography>
              </div>
            </div>
            <div className="w-3/5">
              <Typography className="text-[#53382c]">{currentProduct?.description ?? 'abc'}</Typography>
              <hr className="mb-4 text-[#919eab3d]" />
              {Object.keys(currentProduct?.sizes).length > 1 && (
                <div className="mb-4 flex items-center gap-4">
                  <Typography className="text-[#333333]">Size:</Typography>
                  {Object.values(currentProduct?.sizes).map((item: ISizeDetails, index: number) => (
                    <Typography
                      key={`size ${index}`}
                      className="mr-2 block cursor-pointer border border-[#c3c3c3] px-2.5 py-1.5 "
                    >
                      {item.name}
                    </Typography>
                  ))}
                </div>
              )}
              <div className="mb-4 flex items-center gap-4">
                <Typography className="text-[#333333]">Giá:</Typography>
                <Typography className="font-bold text-[#53382c]"> {formatCurrencyToVND(100000)}</Typography>
              </div>
              <div className="mb-4 flex items-center gap-4">
                <Typography className="text-[#333333]">Số lượng:</Typography>
                <div className="relative flex h-10 items-center">
                  <Input
                    type="text"
                    className="!w-[150px] !border !border-gray-300 bg-white pl-9 !text-center !text-base text-gray-900 ring-4 ring-transparent"
                    labelProps={{
                      className: 'hidden ',
                    }}
                    containerProps={{
                      className: '!min-w-0',
                    }}
                    icon={
                      <IconButton className="!absolute h-8 w-8 rounded-full bg-white shadow-none hover:bg-[#20d15057]">
                        <i className="fa-solid fa-plus fa-xl text-[#0dbd16]"></i>
                      </IconButton>
                    }
                    value={110}
                  />
                  <IconButton className="!absolute left-2 h-8 w-8 rounded-full bg-white shadow-none hover:bg-[#ff563057]">
                    <i className="fa-solid fa-minus fa-xl text-[#f42525]"></i>
                  </IconButton>
                </div>
              </div>
              <Textarea
                rows={2}
                resize={false}
                color="blue"
                variant="standard"
                label="Ghi chú"
                className="min-h-full focus:border-transparent"
                labelProps={{
                  className: '!text-[16px] text-[#333333] peer-focus:!text-red peer-placeholder-shown:text-[#333333]',
                }}
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
