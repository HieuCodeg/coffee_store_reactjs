import * as React from 'react';
import { TitleButton } from '../../../components/Button/TitleButton';
import { Card } from '@material-tailwind/react';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface IOrderProps {}

export function Order(props: IOrderProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[32px] gap-2 pl-3">
        <TitleButton
          icon={<Icon icon={'ic:round-table-restaurant'} className="h-5 w-5" />}
          title="Bàn"
          isActive={true}
        />
      </div>
      <Card className="flex-1 rounded-xl p-2">Chi tiết thực đơn</Card>
    </div>
  );
}
