import { Card } from '@material-tailwind/react';
import { TableItem } from '../../../../components/TabeItem/TableItem';
import { ITableItem } from '../../../../models/common';
import { cashierStore } from './../../../../store/store';

export interface ITableServiceProps {}

export function TableService(props: ITableServiceProps) {
  const { listTable } = cashierStore();
  return (
    <Card className="wrapperBoard grid h-full w-full grid-cols-4 gap-4 overflow-auto border p-4 shadow-xl">
      {listTable.map((table: ITableItem) => (
        <TableItem key={table.id} tableItem={table} />
      ))}
    </Card>
  );
}
