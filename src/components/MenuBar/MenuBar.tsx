import { Icon } from '@iconify/react/dist/iconify.js';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo, removeUserInfo } from '../../services/loginService';

export interface IMenuBarProps {
  isCashier?: boolean;
}

export function MenuBar({ isCashier }: IMenuBarProps) {
  const userInfo = getUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const handleLogout = () => {
    removeUserInfo();
    navigate('/');
  };
  return (
    <div className="flex items-center gap-8 text-white">
      <div className="flex items-center gap-1 text-sm font-semibold">
        <Icon icon={'mdi:calendar-user'} className="h-5 w-5" />
        {userInfo?.name}
      </div>

      <Menu placement="bottom-end">
        <MenuHandler>
          <IconButton className="hover:text-primary -right-2 h-8 w-8 rounded-full bg-transparent text-white hover:bg-white">
            <Icon icon={'mdi:menu-open'} className="h-5 w-5" />
          </IconButton>
        </MenuHandler>
        <MenuList className="text-black">
          {isCashier ? (
            <MenuItem>
              <Link to={'/kitchen'} target="_blank" className="flex items-center gap-3">
                <Icon icon={'ep:dish-dot'} className="h-5 w-5" />
                Nhà bếp
              </Link>
            </MenuItem>
          ) : (
            <MenuItem>
              <Link to={'/cashier'} className="flex items-center gap-3" target="_blank">
                <Icon icon={'material-symbols:close-rounded'} className="h-5 w-5" />
                Thu ngân
              </Link>
            </MenuItem>
          )}
          <MenuItem className="flex items-center gap-3">
            <Icon icon={'twemoji:card-file-box'} className="h-5 w-5" />
            Quản lý
          </MenuItem>
          <MenuItem className="flex items-center gap-3">
            <Icon icon={'flat-color-icons:edit-image'} className="h-5 w-5" />
            Sửa thông tin
          </MenuItem>
          <hr className="my-1" />
          <MenuItem className="flex items-center gap-3 text-red-500" onClick={handleLogout}>
            <Icon icon={'entypo:log-out'} className="h-5 w-5" />
            Đăng xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
