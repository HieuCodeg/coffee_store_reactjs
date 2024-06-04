import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import { EnumStatus, ITableItem } from '../../models/common';

export interface ITableItemProps {
  tableItem: ITableItem;
}

export function TableItem({ tableItem }: ITableItemProps) {
  return (
    <Card className="rounded-lg">
      <div
        className={clsx(
          'flex h-10 items-center justify-center rounded-t-lg border-b border-gray-200',
          tableItem.status === EnumStatus.EMPTY.status ? 'bg-[#d1e9fc]' : 'bg-[#0b7c0b]'
        )}
      >
        {tableItem.status === EnumStatus.EMPTY.status ? (
          <Tooltip content="Mở bàn" placement="bottom">
            <IconButton className="h-8 w-8 rounded-full bg-white text-black">
              <Icon icon={'bi:bell-fill'} className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton className="h-8 w-8 rounded-full bg-white text-[#0b7c0b]">
            <Icon icon={'bi:bell-fill'} className="h-5 w-5" />
          </IconButton>
        )}
      </div>
      <div
        className={clsx(
          'flex flex-col items-center justify-center rounded-b-lg py-4 text-black',
          tableItem.status === EnumStatus.OPEN.status && 'bg-[#3bb23b] text-white'
        )}
      >
        <Typography className="text-gray">{tableItem.statusValue}</Typography>

        <Typography className="text-lg font-semibold">{tableItem.name}</Typography>
      </div>
    </Card>
  );
}
