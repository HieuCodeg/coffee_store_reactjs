import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from '@material-tailwind/react';
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
            <IconButton className="group h-8 w-8 rounded-full bg-white text-black">
              <Icon
                icon={'bi:bell-fill'}
                className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Menu placement="left-start">
            <MenuHandler>
              <IconButton className="group h-8 w-8 rounded-full bg-white text-[#0b7c0b]">
                <Icon
                  icon={'bi:bell-fill'}
                  className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </IconButton>
            </MenuHandler>
            <MenuList className="text-black">
              <MenuItem className="flex gap-2">
                <Icon icon={'material-symbols:close-rounded'} className="h-4 w-4" />
                Hủy Bàn
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Icon icon={'codicon:arrow-swap'} className="h-4 w-4" />
                Chuyển bàn
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Icon icon={'heroicons:arrow-down-on-square-stack-solid'} className="h-4 w-4" />
                Nhập bàn
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Icon icon={'heroicons:share-solid'} className="h-4 w-4" />
                Tách bàn
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Icon icon={'codicon:type-hierarchy'} className="h-4 w-4" />
                Ghép bàn
              </MenuItem>
              <MenuItem className="flex gap-2 text-red-500">
                <Icon icon={'heroicons:bell-alert-solid'} className="h-4 w-4" />
                Thanh toán
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <div
        className={clsx(
          'flex cursor-pointer flex-col items-center justify-center rounded-b-lg border border-transparent py-3 text-black hover:border-yellow-500 hover:opacity-70',
          tableItem.status === EnumStatus.OPEN.status && 'bg-[#3bb23b] text-white'
        )}
      >
        <Typography className="text-gray">{tableItem.statusValue}</Typography>

        <Typography className="text-lg font-semibold">{tableItem.name}</Typography>
      </div>
    </Card>
  );
}
