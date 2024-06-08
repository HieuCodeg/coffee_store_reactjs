import { Button, Dialog, DialogBody, IconButton, Input, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IProduct, ISizeDetails } from '../../../models/common';
import { formatCurrencyToVND } from '../../../utils/helper';

export interface IModalProductProps {
  isOpen: boolean;
  product: IProduct;
  handleCloseModal: () => void;
}

export function ModalProduct({ isOpen, product, handleCloseModal }: IModalProductProps) {
  const [activeSize, setActiveSize] = useState<ISizeDetails>(Object.values(product.sizes)[0]);
  const [totalPrice, setTotalPrice] = useState<number>(Object.values(product.sizes)[0].price);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTimeout((): void => setOpen(isOpen), 1);
  }, [isOpen]);
  const handleChangeSize = (size: ISizeDetails) => {
    const newTotalPrice = +size.price * quantity;
    setActiveSize(size);
    setTotalPrice(newTotalPrice);
  };
  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(+quantity - 1);
    setTotalPrice(+totalPrice - +activeSize.price);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 99) return;
    setQuantity(+quantity + 1);
    setTotalPrice(+totalPrice + +activeSize.price);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{1,2}$/.test(value)) {
      const numericValue = Number(value);
      if (numericValue >= 1 && numericValue <= 99) {
        const newTotalPrice = numericValue * activeSize.price;
        setQuantity(numericValue);
        setTotalPrice(newTotalPrice);
      }
    }
  };

  const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNote(value);
    if (value.length > 255) {
      setError('Giá trị vượt quá ký tự cho phép (255 ký tự)');
    }
  };

  return (
    <Dialog open={open} size="lg" handler={handleCloseModal}>
      <DialogBody className="p-6">
        <div className="flex gap-6">
          <div className="w-2/5">
            <Typography className="text-lg font-bold uppercase text-main-color">{product?.title}</Typography>
            <div className="relative pt-[100%]">
              <img className="absolute top-0 h-full w-full object-cover" src={product?.photo} alt={product?.title} />
            </div>
            <div className="mt-2 flex items-center justify-center gap-4">
              <Typography className="text-label-color">TỔNG CỘNG:</Typography>
              <Typography className="text-lg font-bold text-highLight-color">
                {formatCurrencyToVND(totalPrice)}
              </Typography>
            </div>
          </div>
          <div className="w-3/5">
            <Typography className="text-main-color">{product?.description}</Typography>
            <hr className="mb-4 text-[#919eab3d]" />
            {Object.keys(product?.sizes).length > 1 && (
              <div className="mb-4 flex items-center gap-4">
                <Typography className="text-label-color">Size:</Typography>
                {Object.values(product?.sizes).map((item: ISizeDetails, index: number) => (
                  <Typography
                    key={`size ${index}`}
                    className={clsx(
                      'mr-2 block cursor-pointer border border-[#c3c3c3] px-2.5 py-1.5',
                      activeSize.name === item.name && 'border-highLight-color text-highLight-color'
                    )}
                    onClick={() => handleChangeSize(item)}
                  >
                    {item.name}
                  </Typography>
                ))}
              </div>
            )}
            <div className="mb-4 flex items-center gap-4">
              <Typography className="text-label-color">Giá:</Typography>
              <Typography className="font-bold text-main-color"> {formatCurrencyToVND(activeSize?.price)}</Typography>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <Typography className="text-label-color">Số lượng:</Typography>
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
                  pattern="^[0-9]+$"
                  icon={
                    <IconButton
                      onClick={handleIncreaseQuantity}
                      className="!absolute h-8 w-8 rounded-full bg-white shadow-none hover:bg-[#20d15057] focus-visible:outline-none"
                      disabled={quantity >= 99}
                    >
                      <i
                        className={clsx(
                          'fa-solid fa-plus fa-xl text-[#0dbd16]',
                          quantity >= 99 && 'text-disabled-color'
                        )}
                      ></i>
                    </IconButton>
                  }
                  onChange={handleChangeQuantity}
                  value={quantity}
                />
                <IconButton
                  onClick={handleDecreaseQuantity}
                  className={
                    '!absolute left-2 h-8 w-8 rounded-full bg-white shadow-none hover:bg-[#ff563057] focus-visible:outline-none'
                  }
                  disabled={quantity <= 1}
                >
                  <i
                    className={clsx('fa-solid fa-minus fa-xl text-[#f42525]', quantity <= 1 && 'text-disabled-color')}
                  ></i>
                </IconButton>
              </div>
            </div>
            <Input
              variant="standard"
              label="Ghi chú"
              className="min-h-full focus:border-highLight-color"
              labelProps={{
                className:
                  '!text-[16px] focus:!border-red-500 text-label-color peer-focus:!text-highLight-color peer-focus:after:!border-highLight-color peer-placeholder-shown:text-label-color',
              }}
              value={note}
              onChange={handleChangeNote}
            />
            {error && <Typography className="text-xs text-red-500">{error}</Typography>}
            <div className="mt-4 flex justify-center">
              <Button className="border bg-[#d0181b] px-4 py-2 text-sm text-white hover:border-[#d0181b] hover:bg-white hover:text-[#d0181b] focus-visible:outline-none">
                Đặt món ngay
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
      <IconButton
        className="!absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white focus-visible:outline-none "
        onClick={handleCloseModal}
      >
        <i className="fa-solid fa-xmark fa-xl text-black"></i>
      </IconButton>
    </Dialog>
  );
}
