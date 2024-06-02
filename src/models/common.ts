export interface UserAuth {
  id: string | number;
  name: string;
  roles: object[];
  token: string;
  type: string;
  username: string;
}
