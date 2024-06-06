import { Card } from '@material-tailwind/react';

export interface KitchenProps {}

export function Kitchen(props: KitchenProps) {
  return (
    <>
      {/* {isLoading && <Loading />} */}
      <div className="flex h-full w-full gap-4 pl-4 pr-4 pt-1">
        <div className="h-full w-3/5 overflow-hidden">abc</div>
        <div className="h-full w-2/5 overflow-hidden">abcccc</div>
      </div>
    </>
  );
}
