import { Spinner } from '@material-tailwind/react';

export default function Loading() {
  return (
    <div className="fixed z-[99999] flex h-full w-full items-center justify-center bg-[#00000080] ">
      <Spinner color="blue" className="h-10 w-10" />
    </div>
  );
}
