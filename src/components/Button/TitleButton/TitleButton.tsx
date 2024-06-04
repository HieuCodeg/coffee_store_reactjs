import { Button, Typography } from '@material-tailwind/react';
import clsx from 'clsx';

export interface ITitleButtonProps {
  icon?: JSX.Element;
  title: string;
  isActive?: boolean;
  handleClick?: () => void;
}

export function TitleButton({ icon, title, isActive, handleClick }: ITitleButtonProps) {
  return (
    <Button
      variant="filled"
      className={clsx(
        'flex items-center gap-1 rounded-b-none rounded-t-[15px]  bg-[#CD6868] px-4 normal-case text-white transition-colors duration-300 ease-in-out disabled:opacity-100',
        isActive && 'bg-white text-[#713737]'
      )}
      disabled={isActive}
      onClick={handleClick}
    >
      {icon}
      <Typography className="font-semibold">{title}</Typography>
    </Button>
  );
}
