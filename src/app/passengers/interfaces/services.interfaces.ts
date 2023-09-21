import { IAddress, IUser } from ".";

export interface IUserInfoResponse {
  currentUser: IUser;
}

export interface IAddressResponse {
  addresses: IAddress[];
}
