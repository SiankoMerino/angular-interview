export interface UserInfo {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
  data: IUser[];
  support: ISupport;
}

export interface ISupport {
  url: string;
  text: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const emptyUser: IUser = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: ''
}
