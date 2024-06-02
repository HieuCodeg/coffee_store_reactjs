import { Card } from '@material-tailwind/react';

export interface KitchenProps {}

export function Kitchen(props: KitchenProps) {
  return (
    <>
      <div className="w-2/3">
        <Card>abc</Card>
      </div>
      <div className="w-1/3">
        <Card>abc</Card>
      </div>
    </>
  );
}
