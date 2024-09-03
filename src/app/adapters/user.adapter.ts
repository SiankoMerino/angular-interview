import { IUser, UserInfo } from "@app/models";

export const UserAdapter = (userInfo: UserInfo): IUser[] => ([...userInfo.data]);
