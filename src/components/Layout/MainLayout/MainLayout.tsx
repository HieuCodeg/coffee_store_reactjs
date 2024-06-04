import { Icon } from '@iconify/react';
import { Typography } from '@material-tailwind/react';

export interface IMainLayoutProps {
  children: JSX.Element;
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#793939]">
      <div className="flex-1 overflow-hidden">{children}</div>
      <div className="flex h-[30px] w-full items-center justify-center gap-12 text-white">
        <div className="flex items-center gap-1">
          <Icon icon={'ic:baseline-phone-callback'} color="white" width={20} height={50} />
          <Typography className="text-[13px]">Hỗ trợ: 1900 1009</Typography>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon={'mdi:address-marker'} color="white" width={20} height={50} />
          <Typography className="text-[13px]"> Địa chỉ liên hệ: 28 Nguyễn Tri Phương</Typography>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon={'ion:mail-open-outline'} color="white" width={20} height={50} />
          <Typography className="text-[13px]">hieucodeg@gmail.com</Typography>
        </div>
      </div>
    </div>
  );
}
