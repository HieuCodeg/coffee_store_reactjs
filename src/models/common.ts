export interface IUserAuth {
  id: string | number;
  name: string;
  roles: object[];
  token: string;
  type: string;
  username: string;
}

export const EnumStatus = {
  EMPTY: { status: 'EMPTY', statusValue: 'Trống' },
  OPEN: { status: 'OPEN', statusValue: 'Mở' },
  HANDLING: { status: 'HANDLING', statusValue: 'Nhập bếp' },
  SERVICE: { status: 'SERVICE', statusValue: 'Đã phục vụ' },
};
export interface ITableItem {
  id: number;
  name: string;
  status: string;
  statusValue: string;
}

export interface ICategory {
  id: number;
  title: string;
}

interface ISizeDetails {
  name: string;
  price: string;
}

interface ISizes {
  [key: string]: ISizeDetails;
}

export interface IProduct {
  id: number;
  categoryId: string;
  description: string;
  photo: string;
  sizes: ISizes;
  title: string;
}
