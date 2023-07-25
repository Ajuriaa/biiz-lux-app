export interface IUser {
  email: string;
  fullName: string;
  phoneNumber: string;
  userable: IUserable;
}

export interface IUserable {
  addresses?: IAddress[];
}

export interface IAddress {
  name: string;
  address: string;
}

export interface IUserInfoResponse {
  currentUser: IUser;
}
