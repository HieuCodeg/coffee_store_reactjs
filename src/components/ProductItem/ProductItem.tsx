import { Card, Typography } from '@material-tailwind/react';
import { IProduct } from '../../models/common';
import { formatCurrencyToVND } from '../../utils/helper';

export interface IProductItemProps {
  product: IProduct;
  handleAddToCart?: (product: IProduct) => void;
}

export function ProductItem({ product, handleAddToCart }: IProductItemProps) {
  return (
    <Card className="relative rounded-lg">
      <div className="relative cursor-pointer pt-[100%]">
        <img className="absolute top-0 h-full w-full object-cover" src={product.photo} alt={product.title} />
      </div>
      <div className="p-1 text-center">
        <Typography className="no-wrap cursor-pointer text-sm font-bold uppercase hover:text-[#f14a50]">
          {product.title}
        </Typography>
        <div className="flex justify-between text-[#53382c]">
          {Object.keys(product.sizes).length === 1 ? (
            <Typography>Giá</Typography>
          ) : (
            <Typography>
              {Object.entries(product.sizes).map(([key, value]) => (
                <span key={key} style={{ marginRight: 4 }}>
                  {value.name}
                </span>
              ))}
            </Typography>
          )}
          <Typography className="font-bold">
            &nbsp;
            {formatCurrencyToVND(Object.values(product.sizes)[0].price)}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
