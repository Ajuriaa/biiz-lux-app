import { IAddress } from ".";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  imageUrl: string;
  userable: IUserable;
}

export interface IUserable {
  addresses?: IAddress[];
}
