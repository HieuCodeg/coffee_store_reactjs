import { Icon } from '@iconify/react';
import { Card } from '@material-tailwind/react';
import { TitleButton } from '../../../components/Button/TitleButton';
import { cashierStore } from './../../../store/store';
import { MenuService } from './MenuService';
import { TableService } from './TableService';

export function Manager() {
  const { isMenu, setIsMenu } = cashierStore();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-8 gap-2 pl-3">
        <TitleButton
          icon={<Icon icon={'ic:twotone-restaurant-menu'} className="h-5 w-5" />}
          title="Phòng bàn"
          isActive={!isMenu}
          handleClick={() => setIsMenu(false)}
        />
        <TitleButton
          icon={<Icon icon={'ic:baseline-menu-book'} className="h-5 w-5" />}
          title="Thực đơn"
          isActive={isMenu}
          handleClick={() => setIsMenu(true)}
        />
      </div>
      <Card className="flex-1 overflow-auto rounded-xl p-2">{isMenu ? <MenuService /> : <TableService />}</Card>
    </div>
  );
}
